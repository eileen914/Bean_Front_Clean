import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./FloorplanOverlay.css";

/**
 *
 * Props
 *  - imageSrc: string (object URL / remote URL)
 *  - response: { image_size:{width,height}, detections:[{class,confidence,x,y,width,height}]} | null
 *  - showLabels?: boolean
 *  - zoomable?: boolean
 *  - initialScale?: number (default 1)
 *  - minScale?: number (default 0.2)
 *  - maxScale?: number (default 5)
 *  - className?: string (wrapper)
 *  - onSelect?: (det, index) => void
 */
export default function FloorplanOverlay({
  imageSrc,
  response,
  showLabels = true,
  zoomable = true,
  initialScale = 1,
  minScale = 0.2,
  maxScale = 5,
  className = "",
  onSelect,
}) {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);

  const [display, setDisplay] = useState({ w: 0, h: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const [scale, setScale] = useState(initialScale);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });

  const imgW = response?.image_size?.width ?? 0;
  const imgH = response?.image_size?.height ?? 0;
  const baseScaleX = display.w && imgW ? display.w / imgW : 1;
  const baseScaleY = display.h && imgH ? display.h / imgH : 1;

  const detections = useMemo(() => response?.detections ?? [], [response]);
  // chair 상태 관리용 state
  const [chairs, setChairs] = useState(detections);

  useEffect(() => {
    setChairs(detections); // response 변경 시 chairs 상태 초기화
  }, [detections]);

  // 선택된 chair index 상태 추가
  const [selectedChairIdx, setSelectedChairIdx] = useState(null);

  useEffect(() => {
    const onResize = () => {
      if (!imgRef.current) return;
      setDisplay({ w: imgRef.current.clientWidth, h: imgRef.current.clientHeight });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleImgLoad = useCallback(() => {
    if (!imgRef.current) return;
    setImgLoaded(true);
    setDisplay({ w: imgRef.current.clientWidth, h: imgRef.current.clientHeight });
  }, []);

  const onWheel = useCallback(
    (e) => {
      if (!zoomable) return;
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = delta > 0 ? 1.1 : 1 / 1.1;
      const rect = wrapperRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const nextScale = clamp(scale * factor, minScale, maxScale);
      const k = nextScale / scale;
      setPan((p) => ({ x: cx - (cx - p.x) * k, y: cy - (cy - p.y) * k }));
      setScale(nextScale);
    },
    [zoomable, scale, minScale, maxScale]
  );

  const onMouseDown = useCallback((e) => {
    if (!zoomable) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  }, [zoomable, pan.x, pan.y]);

  const onMouseMove = useCallback((e) => {
    if (!zoomable || !isPanning.current) return;
    setPan({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  }, [zoomable]);

  const onMouseUp = useCallback(() => { isPanning.current = false; }, []);
  const onMouseLeave = useCallback(() => { isPanning.current = false; }, []);

  const asRect = useCallback((d) => {
    const left = (d.x - d.width / 2) * baseScaleX;
    const top = (d.y - d.height / 2) * baseScaleY;
    const w = d.width * baseScaleX;
    const h = d.height * baseScaleY;
    return { left, top, w, h };
  }, [baseScaleX, baseScaleY]);

  // chair의 상태별 클래스 결정 함수
  const getChairClass = (d, i) => {
    if (d.class.toLowerCase() !== "chair") return "";
    if (selectedChairIdx === i) return "det-box--chair-select";
    if (d.occupied) return "det-box--chair-taken";
    return "det-box--chair-empty";
  };

  // chair 클릭 시 API 호출 및 상태 업데이트
  const handleChairClick = async (chair, idx) => {
    const newOccupied = !chair.occupied;
    try {
      const res = await axios.post("/api/seat-occupied", {
        chair_id: chair.chair_id,
        occupied: newOccupied,
      });
      if (res.data.success) {
        setChairs((prev) =>
          prev.map((c, i) =>
            i === idx ? { ...c, occupied: newOccupied } : c
          )
        );
      } else {
        alert(res.data.error || "좌석 상태 변경 실패");
      }
    } catch (err) {
      alert("서버 오류");
    }
  };

  return (
    <div className={`floorplan-wrapper ${className}`}>
      <div
        ref={wrapperRef}
        className="floorplan-stage"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        role="region"
        aria-label="Floorplan viewer"
      >
        <div
          className="floorplan-transform"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt="uploaded"
            className="floorplan-image"
            onLoad={handleImgLoad}
            draggable={false}
          />

          {imgLoaded && (
            <div className="det-layer">
              {chairs.map((d, i) => {
                const r = asRect(d);
                const cls = (d.class || "other").toLowerCase();
                const label = `${d.class}${typeof d.confidence === "number" ? ` ${Math.round(d.confidence * 100)}%` : ""}`;
                const chairClass = cls === "chair" ? getChairClass(d, i) : `det-box--${cls}`;
                return (
                  <div key={i} className="det-item" style={{ left: r.left, top: r.top, width: r.w, height: r.h }}>
                    <div
                      className={`det-box ${chairClass}`}
                      aria-label={label}
                      onClick={() => cls === "chair" && handleChairClick(d, i)}
                      style={{ cursor: cls === "chair" ? "pointer" : "default" }}
                    />
                    {showLabels && (
                      <div className={`det-label det-label--${cls}`}>{label}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {imgLoaded && (
          <div className="det-hitlayer" style={{ cursor: zoomable ? (isPanning.current ? "grabbing" : "grab") : "default" }}>
            {detections.map((d, i) => {
              const r = asRect(d);
              const isChairEmpty =
                d.class.toLowerCase() === "chair" &&
                !d.taken &&
                selectedChairIdx !== i;
              return (
                <button
                  key={`hit-${i}`}
                  type="button"
                  className="det-hit"
                  style={{ left: r.left * scale + pan.x, top: r.top * scale + pan.y, width: r.w * scale, height: r.h * scale }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // chair-empty만 선택 가능
                    if (isChairEmpty) setSelectedChairIdx(i);
                    onSelect?.(d, i);
                  }}
                  aria-label={`select ${d.class}`}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="fp-controls">
        <span className="fp-controls__label">zoom</span>
        <button className="fp-btn" onClick={() => setScale((s) => clamp(s / 1.2, minScale, maxScale))}>-</button>
        <button className="fp-btn" onClick={() => setScale((s) => clamp(s * 1.2, minScale, maxScale))}>+</button>
        <button className="fp-btn" onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }}>Reset</button>
        <span className="fp-controls__scale">{scale.toFixed(2)}</span>
      </div>
    </div>
  );
}

FloorplanOverlay.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  response: PropTypes.shape({
    image_size: PropTypes.shape({ width: PropTypes.number, height: PropTypes.number }),
    detections: PropTypes.arrayOf(PropTypes.shape({
      class: PropTypes.string,
      confidence: PropTypes.number,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }))
  }),
  showLabels: PropTypes.bool,
  zoomable: PropTypes.bool,
  initialScale: PropTypes.number,
  minScale: PropTypes.number,
  maxScale: PropTypes.number,
  className: PropTypes.string,
  onSelect: PropTypes.func,
};

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }