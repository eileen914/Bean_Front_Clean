import { useCallback } from "react";
import styles from "./ChairDetection.module.css";

/**
 * ChairDetection 컴포넌트
 * - 좌석(의자) 하나를 렌더링
 * - 클릭/키보드 접근 가능
 * - 선택/사용중/창가/콘센트 등 상태 표시
 * - onSelect로 부모에 선택 이벤트 전달
 */
const ChairDetection = ({
  width = 50,           // 의자 너비(px)
  height = 50,          // 의자 높이(px)
  x_position = 0,       // 좌표 X
  y_position = 0,       // 좌표 Y
  window = false,       // 창가 여부
  socket = false,       // 콘센트 여부
  occupied = false,     // 사용중 여부
  floorplan_id = 0,     // 도면 ID
  chair_idx = 0,        // 의자 인덱스
  selected = false,     // 선택 상태
  onSelect,             // 선택 이벤트 핸들러
  className,            // 추가 클래스
}) => {
  // 좌석 위치/크기 스타일
  const style = {
    left: x_position,
    top: y_position,
    width,
    height,
  };

  // 클릭 시 선택 이벤트
  const handleClick = useCallback(() => {
    if (onSelect) onSelect(chair_idx);
  }, [onSelect, chair_idx]);

  // 키보드(Enter/Space)로 선택 이벤트
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(chair_idx);
      }
    },
    [onSelect, chair_idx]
  );

  // 상태별 클래스 조합
  const classes = [
    styles.root,
    occupied ? styles.occupied : "",
    selected ? styles.selected : "",
    className || "",
  ]
    .join(" ")
    .trim();

  return (
    <div
      className={classes}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-disabled={occupied}
      aria-label={`의자 #${chair_idx + 1}${occupied ? " (사용중)" : ""}${window ? " 창가" : ""}${socket ? " 콘센트" : ""}`}
      data-floorplan-id={floorplan_id}
      data-chair-idx={chair_idx}
    >
    </div>
  );
};

export default ChairDetection;