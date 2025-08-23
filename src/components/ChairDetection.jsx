import React, { useCallback } from "react";
import styles from "./ChairDetection.module.css";

const ChairDetection = ({
  width = 50,
  height = 50,
  x_position = 0, // 중심 x
  y_position = 0, // 중심 y
  window = false,
  socket = false,
  occupied = false,
  floorplan_id = 0,
  chair_idx = 0,
  selected = false,
  onSelect, // (id) => void
  className,
}) => {
  const style = {
    left: x_position,
    top: y_position,
    width,
    height,
  };

  const handleClick = useCallback(() => {
    if (onSelect) onSelect(chair_idx);
  }, [onSelect, chair_idx]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(chair_idx);
      }
    },
    [onSelect, chair_idx]
  );

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
      aria-label={`의자 #${chair_idx + 1}${occupied ? " (사용중)" : ""}${
        window ? " 창가" : ""
      }${socket ? " 콘센트" : ""}`}
      data-floorplan-id={floorplan_id}
      data-chair-idx={chair_idx}
    >
    </div>
  );
};

export default ChairDetection;
