import { useCallback, useState } from "react";
import "./UntakenSeat.css";
import line12 from "../assets/Line7.png";

/**
 * UntakenSeat 컴포넌트
 * - props:
 *   defaultReserved: 초기 예약 상태 (boolean)
 *   onToggle: 예약 상태 변경 시 콜백 (함수)
 * - 역할: 빈 좌석 정보와 예약 버튼 UI, 예약 상태 토글 및 부모에 알림
 */
export default function UntakenSeat({
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
    <div className="untaken-frame">
      {/* 상단 라인 이미지 */}
      <div className="untaken-frame-wrapper">
        <div className="untaken-div-wrapper">
          <div className="untaken-line-wrapper">
            <img className="untaken-line" alt="Line" src={line12} />
          </div>
        </div>
      </div>

      {/* 좌석 상세 정보 */}
      <div className="untaken-div">
        <div className="untaken-div-2">
          {/* 좌석 번호 */}
          <p className="untaken-element">
            <span className="untaken-text-wrapper">{`${floorPlanId}-${chair?.id}`}</span>
            <span className="untaken-span">번 좌석</span>
          </p>

          {/* 좌석 타입/기능 */}
          <div className="untaken-element-2">
            2인석&nbsp;|&nbsp;&nbsp;기본(사각) 테이블&nbsp;|&nbsp;&nbsp;콘센트
            자리
          </div>
        </div>

        {/* 예약 버튼 (상태에 따라 텍스트 변경) */}
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
  );
}
