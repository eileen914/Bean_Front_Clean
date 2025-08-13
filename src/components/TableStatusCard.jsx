import React from "react";
import "./TableStatusCard.css";

/**
 * TableStatusCard
 * @param {number|string} tableNo           - 테이블 번호
 * @param {string}        elapsedLabel      - 경과 시간 라벨 (예: "0시간 38분 동안 사용중")
 * @param {string}        checkinTime       - 입장시간 (예: "15:03")
 * @param {string}        expectedOutTime   - 예상 퇴장시간 (예: "17:33")
 * @param {string}        remainingLabel    - 남은 시간 라벨 (예: "남은 시간 1시간 15분")
 * @param {"in-use"|"idle"|"reserved"} status - 상태 (스타일 분기용, 기본 in-use)
 * @param {function}      onCheckout        - 퇴장 처리 버튼 클릭 핸들러
 * @param {boolean}       disabled          - 버튼 비활성화 여부
 */
const TableStatusCard = ({
  tableNo,
  elapsedLabel,
  checkinTime,
  expectedOutTime,
  remainingLabel,
  status = "in-use",
  onCheckout,
  disabled = false,
}) => {
  return (
    <section
      className={`ts-card ts-${status}`}
      role="group"
      aria-label={`${tableNo}번 테이블 상태`}
    >
      <header className="ts-header">
        <h3 className="ts-title">
          <strong>{tableNo}</strong> 번 테이블
        </h3>
      </header>

      <div className="ts-pill" aria-live="polite">
        {elapsedLabel}
      </div>

      <div className="ts-meta">
        <div className="ts-row">
          <span className="ts-key">입장시간</span>
          <span className="ts-sep">|</span>
          <span className="ts-val">{checkinTime}</span>
        </div>
        <div className="ts-row">
          <span className="ts-key">예상 퇴장시간</span>
          <span className="ts-sep">|</span>
          <span className="ts-val">
            {expectedOutTime}
            {remainingLabel ? (
              <span className="ts-remaining"> ({remainingLabel})</span>
            ) : null}
          </span>
        </div>
      </div>

      <div className="ts-actions">
        <button
          className="ts-btn"
          type="button"
          onClick={onCheckout}
          disabled={disabled}
        >
          퇴장 처리하기
        </button>
      </div>
    </section>
  );
};

export default TableStatusCard;
