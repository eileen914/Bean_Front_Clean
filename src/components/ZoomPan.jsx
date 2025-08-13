// src/components/ZoomPan.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ZoomPan({ children, min = 0.5, max = 4, step = 0.2 }) {
  const viewportRef = useRef(null);
  const contentRef  = useRef(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos]     = useState({ x: 0, y: 0 });
  const [drag, setDrag]   = useState(null);

  const minScaleRef = useRef(1);

  // (중복 제거) 최초 배율을 하한선으로 고정
  useEffect(() => {
    minScaleRef.current = scale;   // 보통 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 컨텐츠 실제 크기 구하기 (이미지 natural 크기 우선)
  const getContentSize = () => {
    const img = contentRef.current?.querySelector("img");
    if (img) {
      const w = img.naturalWidth  || img.width  || img.getBoundingClientRect().width  || 0;
      const h = img.naturalHeight || img.height || img.getBoundingClientRect().height || 0;
      return { w, h };
    }
    const rect = contentRef.current?.getBoundingClientRect();
    return { w: rect?.width || 0, h: rect?.height || 0 };
  };

  // ✅ 주어진 배율 s에서 컨텐츠를 캔버스 중앙에 두는 translate
  const getCenterPos = (s) => {
    const vp = viewportRef.current;
    if (!vp) return { x: 0, y: 0 };
    const { w, h } = getContentSize();
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    return { x: (vw - w * s) / 2, y: (vh - h * s) / 2 };
  };

  // ✅ 초기 진입 시 "가운데 정렬" (이미지가 캐시에 있어도 재계산)
  useLayoutEffect(() => {
    // 1) 즉시 한 번 가운데
    setPos(getCenterPos(scale));

    // 2) 이미지 로드 후 natural 크기 확정되면 한 번 더 가운데
    const img = contentRef.current?.querySelector("img");
    if (img) {
      const recenter = () => setPos(getCenterPos(scale));
      if (img.complete) recenter();
      else img.addEventListener("load", recenter, { once: true });
      return () => img.removeEventListener && img.removeEventListener("load", recenter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 최초만

  // wheel: non-passive로 등록 (축소 시 '최소 배율 도달'일 때만 중앙 스냅 유지)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const dir = -Math.sign(e.deltaY); // 위: +1(확대), 아래: -1(축소)
      const EPS = 1e-6;

      setScale((s) => {
        const hardMin = Math.max(minScaleRef.current, min);
        const next = Math.min(max, Math.max(hardMin, s + dir * step));
        if (!contentRef.current) return next;

        const rect = contentRef.current.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const k  = next / s;

        if (dir < 0 && Math.abs(next - hardMin) <= EPS) {
          // 최소 배율에 딱 닿을 때만 중앙 스냅
          setPos(getCenterPos(next));
        } else {
          // 그 외엔 커서 기준 유지
          setPos((p) => ({ x: cx - k * (cx - p.x), y: cy - k * (cy - p.y) }));
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [min, max, step]);

  const onMouseDown = (e) => {
    e.preventDefault();
    setDrag({ x: e.clientX, y: e.clientY });
  };
  const onMouseMove = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
    setDrag({ x: e.clientX, y: e.clientY });
  };
  const endDrag = () => setDrag(null);

  return (
    <div
      ref={viewportRef}
      className="zoompan-viewport"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <div
        ref={contentRef}
        className="zoompan-content"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
          userSelect: "none",
          pointerEvents: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
