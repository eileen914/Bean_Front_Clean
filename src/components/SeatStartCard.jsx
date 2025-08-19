import React, { useMemo, useState } from "react";
import "./SeatStartCard.css";

/**
 * SeatStartCard
 * -----------------------------------------
 * @param {string|number} tableNo          - 좌석/테이블 번호
 * @param {Date}          now              - 현재 시간 (기본: new Date())
 * @param {number[]}      options          - 선택 가능한 사용 시간(분) 배열 (기본: [90,120,180])
 * @param {number|null}   defaultMinutes   - 초깃값(분) (기본: options[0])
 * @param {boolean}       disabled         - 전체 비활성화 여부
 * @param {function}      onStart          - 착석 처리 클릭 시 호출 (payload: { tableNo, minutes, checkinAt, expectedOutAt })
 * @param {function}      onChangeMinutes  - 분 선택 변경 시 콜백 (optional)
 * -----------------------------------------
 */
export default function SeatStartCard({
  tableNo,
  now,
  options = [90, 120, 180],
  defaultMinutes,
  disabled = false,
  onStart,
  onChangeMinutes,
}) {
  const _now = useMemo(() => now ?? new Date(), [now]);
  const [minutes, setMinutes] = useState(
    defaultMinutes ?? (options && options.length ? options[0] : 90)
  );

  const fmtHHMM = (d) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;

  const handlePick = (m) => {
    setMinutes(m);
    onChangeMinutes?.(m);
  };

  const handleStart = () => {
    const checkinAt = _now;
    const expectedOutAt = new Date(checkinAt.getTime() + minutes * 60_000);
    onStart?.({ tableNo, minutes, checkinAt, expectedOutAt });
  };

  return (
    <section
      className={`ss-card ${disabled ? "is-disabled" : ""}`}
      role="group"
      aria-label={`${tableNo}번 좌석 착석 설정`}
    >
      <header className="ss-header">
        <h3 className="ss-title">
          <strong>{tableNo}</strong> 번 좌석
        </h3>
        <div className="ss-now">
          <span className="ss-key">현재시간</span>
          <span className="ss-sep">|</span>
          <time className="ss-val" dateTime={_now.toISOString()}>
            {fmtHHMM(_now)}
          </time>
        </div>
      </header>

      <div className="ss-section">
        <div className="ss-label">
          사용시간 설정하기 <span className="ss-hint">(선택)</span>
        </div>
        <div
          className="ss-options"
          role="radiogroup"
          aria-label="사용시간 선택"
        >
          {options.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={minutes === m}
              className={`ss-opt ${minutes === m ? "is-active" : ""}`}
              onClick={() => handlePick(m)}
              disabled={disabled}
            >
              {m}분
            </button>
          ))}
        </div>
      </div>

      <div className="ss-actions">
        <button
          className="ss-btn"
          type="button"
          onClick={handleStart}
          disabled={disabled}
        >
          착석 처리하기
        </button>
      </div>
    </section>
  );
}
