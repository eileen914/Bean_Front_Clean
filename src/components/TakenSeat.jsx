import React, { useCallback, useState } from "react";
import line12 from "../assets/Line7.png";
import "./TakenSeat.css";
import { fmtDuration, fmtHHMM } from "../utils/dateTime";

/**
 * TakenSeat 컴포넌트
 * - props:
 *   defaultReserved: 초기 예약 상태 (boolean)
 *   onToggle: 예약 상태 변경 시 콜백 (함수)
 * - 역할: 좌석 정보와 예약 버튼 UI, 예약 상태 토글 및 부모에 알림
 */
export default function TakenSeat({
  defaultReserved = false,
  onToggle,
  chair,
  floorPlanId,
}) {
  // 예약 상태 관리
  const [reserved, setReserved] = useState(defaultReserved);

  // 예약 상태 토글 핸들러 (클릭/키보드)
  const handleToggle = useCallback(() => {
    setReserved((prev) => {
      const next = !prev;
      onToggle?.(next); // 필요시 부모에 예약 상태 전달
      return next;
    });
  }, [onToggle]);

  // 키보드 접근성(Enter/Space로 토글)
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle();
    }
  };

  // 좌석 정보 및 예약 UI 렌더링
  return (
    <div className="taken-frame">
      {/* 상단 라인 이미지 */}
      <div className="taken-frame-wrapper">
        <div className="taken-div-wrapper">
          <div className="taken-line-wrapper">
            <img className="taken-line" alt="Line" src={line12} />
          </div>
        </div>
      </div>

      {/* 좌석 상세 정보 */}
      <div className="taken-div">
        {/* 좌석 번호 */}
        <p className="taken-element">
          <span className="taken-text-wrapper">{`${floorPlanId}-${chair?.id}`}</span>
          <span className="taken-span">번 좌석</span>
        </p>

        {/* 좌석 타입/기능 */}
        <div className="taken-element-2">
          2인석&nbsp;|&nbsp;&nbsp;기본(사각) 테이블&nbsp;|&nbsp;&nbsp;콘센트
          자리
        </div>

        {/* 사용중 시간 */}
        <div className="taken-div-wrapper-2">
          <div className="taken-text-wrapper-2">
            {`${fmtDuration(
              Date.now() -
                (new Date(chair?.entry_time).getTime() + 9 * 60 * 60 * 1000)
            )} 동안 사용중`}
          </div>
        </div>

        {/* 입장/퇴장/남은 시간 */}
        <p className="taken-p">
          <span className="taken-text-wrapper-3">
            입장시간|&nbsp;&nbsp;
            {`${fmtHHMM(
              new Date(chair?.entry_time).getTime() + 9 * 60 * 60 * 1000
            )}`}
            <br />
            예상 퇴장시간|&nbsp;&nbsp;
            {`${fmtHHMM(
              new Date(chair?.entry_time).getTime() +
                9 * 60 * 60 * 1000 +
                120 * 60_000
            )}`}
            &nbsp;
          </span>
          <span className="taken-text-wrapper-4">&nbsp;</span>
          <span className="taken-text-wrapper-4">
            {`남은 시간: ${fmtDuration(
              new Date(chair?.entry_time).getTime() +
                120 * 60_000 -
                new Date(chair?.entry_time).getTime()
            )}`}
          </span>
        </p>

        {/* 예약 버튼 (상태에 따라 텍스트 변경) */}
        <div
          className={`taken-div-wrapper-3 ${reserved ? "reserved" : ""}`}
          role="button"
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={handleKey}
          aria-pressed={reserved}
        >
          <div className="taken-text-wrapper-6">
            {reserved ? "예약 완료" : "지금 예약하기"}
          </div>
        </div>
      </div>
    </div>
  );
}
