import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * ZoomPanUser
 * - 초기 배율: 이미지 세로가 뷰포트 높이에 "딱 맞도록" (fit-height)
 * - 휠 줌(커서 기준), 드래그로 이동
 * - 최소 배율은 'fit-height' 배율로 고정
 *
 * props:
 *   src: 이미지 경로(필수)
 *   alt: 대체 텍스트
 *   min, max, step: 줌 설정(선택)
 *   className: viewport에 추가할 클래스(선택)
 */
export default function ZoomPanUser({
  src,
  alt = "",
  min = 0.5,
  max = 4,
  step = 0.2,
  className = "",
}) {
  const viewportRef = useRef(null);
  const contentRef  = useRef(null);
  const imgRef      = useRef(null);

  const [scale, setScale] = useState(1);
  const [pos, setPos]     = useState({ x: 0, y: 0 });
  const [drag, setDrag]   = useState(null);

  const minScaleRef = useRef(1); // 최소 배율(=fit-height) 보관

  // 현재 이미지 natural 크기 구하기
  const getNaturalSize = () => {
    const img = imgRef.current;
    if (!img) return { w: 0, h: 0 };
    const w = img.naturalWidth  || img.width  || 0;
    const h = img.naturalHeight || img.height || 0;
    return { w, h };
  };

  // s 배율에서 가운데 정렬 translate
  const getCenterPos = (s) => {
    const vp = viewportRef.current;
    const img = imgRef.current;
    if (!vp || !img) return { x: 0, y: 0 };
    const { w, h } = getNaturalSize();
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    return { x: (vw - w * s) / 2, y: (vh - h * s) / 2 };
  };

  // fit-height 배율 계산 + 중앙 정렬
  const recalcFitAndCenter = () => {
    const vp = viewportRef.current;
    const { w, h } = getNaturalSize();
    if (!vp || !w || !h) return;

    const vw = vp.clientWidth;
    const vh = vp.clientHeight;

    // 세로 맞춤
    let s = vh / h;

    // 범위 클램프
    const hardMin = Math.max(min, 1e-6);
    s = Math.max(hardMin, Math.min(max, s));

    setScale(s);
    setPos(getCenterPos(s));
    minScaleRef.current = s; // 최소 배율을 fit-height로 고정
  };

  // 최초 진입 및 이미지 로드 시 재계산
  useLayoutEffect(() => {
    recalcFitAndCenter();

    const img = imgRef.current;
    if (img) {
      const onload = () => recalcFitAndCenter();
      if (img.complete) onload();
      else img.addEventListener("load", onload, { once: true });
      return () => img.removeEventListener && img.removeEventListener("load", onload);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 뷰포트 리사이즈에도 재계산
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ro = new ResizeObserver(() => recalcFitAndCenter());
    ro.observe(vp);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 휠 줌: 최소 배율에서는 중앙 스냅, 그 외엔 커서 기준 유지
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      const dir = -Math.sign(e.deltaY); // 위: 확대(+), 아래: 축소(-)
      const EPS = 1e-6;

      setScale((s) => {
        const hardMin = Math.max(minScaleRef.current, min);
        const next = Math.min(max, Math.max(hardMin, s + dir * step));
        const rect = contentRef.current?.getBoundingClientRect();

        if (!rect) return next;

        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const k  = next / s;

        if (dir < 0 && Math.abs(next - hardMin) <= EPS) {
          setPos(getCenterPos(next)); // 하한 도달 시 중앙 스냅
        } else {
          setPos((p) => ({ x: cx - k * (cx - p.x), y: cy - k * (cy - p.y) })); // 커서 기준 줌
        }
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, step]);

  // 드래그 이동
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
      className={`zoompan-user-viewport ${className}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
    >
      <div
        ref={contentRef}
        className="zoompan-user-content"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
          userSelect: "none",
          pointerEvents: "auto",
        }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="zoompan-user-img"
          draggable={false}
        />
      </div>
    </div>
  );
}
