import React, { useCallback, useState } from "react";
import "./UntakenSeat.css";
import line12 from "../assets/Line7.png";

 export default function UntakenSeat () {
  const [reserved, setReserved] = useState(defaultReserved);

  const handleToggle = useCallback(() => {
    setReserved(prev => {
      const next = !prev;
      onToggle?.(next);
      return next;
    });
  }, [onToggle]);

  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className="untaken-frame">
      <div className="untaken-frame-wrapper">
        <div className="untaken-div-wrapper">
          <div className="untaken-line-wrapper">
            <img className="untaken-line" alt="Line" src={line12} />
          </div>
        </div>
      </div>

      <div className="untaken-div">
        <div className="untaken-div-2">
          <p className="untaken-element">
            <span className="untaken-text-wrapper">6-1</span>
            <span className="untaken-span">번 좌석</span>
          </p>

          <div className="untaken-element-2">
            2인석&nbsp;|&nbsp;&nbsp;기본(사각)
            테이블&nbsp;|&nbsp;&nbsp;콘센트 자리
          </div>

          {/* ▼ 같은 박스에서 토글 */}
          <div
            className={`untaken-div-wrapper-2 ${reserved ? "reserved" : ""}`}
            role="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={handleKey}
            aria-pressed={reserved}
          >
            <div className="untaken-text-wrapper-2">
              {reserved ? "예약 완료" : "지금 예약하기"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

