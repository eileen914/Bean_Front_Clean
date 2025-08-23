import React from "react";
const ChairDetection = ({
  width = 50,
  height = 50,
  x_position = 0,
  y_position = 0,
  window = false,
  socket = false,
  occupied = false,
  floorplan_id = 0,
  chair_idx = 0,
  selected = false,
  onSelect,
}) => {
  // 중심 좌표(x_position, y_position) 기준으로 위치 계산
  const left = x_position - width / 2;
  const top = y_position - height / 2;
  let chairStyle = {
    position: "absolute",
    left: left,
    top: top,
    width: width,
    height: height,
    margin: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    border: "2px solid rgba(104, 93, 74, 0.35)",
    cursor: occupied ? "not-allowed" : "pointer",
    transition: "filter 0.2s",
  };
  if (occupied) {
    chairStyle.backgroundColor = "#FEEFB2";
    chairStyle.border = "2px solid #685D4A";
  } else if (selected) {
    chairStyle.backgroundColor = "#FEE266";
    chairStyle.border = "3px solid #827A6A";
    chairStyle.filter = "drop-shadow(0px 4px rgba(130, 122, 106, 0.3))";
  }
  const handleClick = () => {
    if (onSelect) onSelect();
  };
  return <div style={chairStyle} onClick={handleClick}></div>;
};
export default ChairDetection;
