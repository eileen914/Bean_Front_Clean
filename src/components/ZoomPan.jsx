// src/components/ZoomPan.jsx
import React, { useEffect, useRef, useState } from "react";

export default function ZoomPan({ children, min = 0.5, max = 4, step = 0.2 }) {
  const viewportRef = useRef(null);
  const contentRef  = useRef(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos]     = useState({ x: 0, y: 0 });
  const [drag, setDrag]   = useState(null);

  // wheel: non-passive로 등록
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault(); // 이제 허용됨 (passive:false)
      const delta = -Math.sign(e.deltaY) * step;
      setScale((s) => {
        const next = Math.min(max, Math.max(min, s + delta));
        if (!contentRef.current) return next;

        // 커서 기준 줌 보정
        const rect = contentRef.current.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const k = next / s;
        setPos((p) => ({ x: cx - k * (cx - p.x), y: cy - k * (cy - p.y) }));
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
