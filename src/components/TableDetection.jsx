import React from "react";
const TableDetection = ({
  width = 100,
  height = 100,
  x_position = 0,
  y_position = 0,
  shape = "rectangle",
  seat_number = "4인석",
  floorplan_id = 0,
  table_idx = 0,
}) => {
  // 중심 좌표(x_position, y_position) 기준으로 위치 계산
  const left = x_position - width / 2;
  const top = y_position - height / 2;
  // 테이블 스타일
  let tableStyle = {
    position: "absolute",
    left: left,
    top: top,
    width: width,
    height: height,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: shape === "circle" ? "50%" : "2px",
    background: "#685D4A", // 내부 색상
    color: "#111", // 중앙 글씨 검정색
    border: "2px solid #685D4A", // 테두리 색상
    fontWeight: "bold",
    fontSize: 16,
  };
  return (
    <div style={tableStyle}>
      <span style={{ color: "#111", fontSize: 10, fontWeight: "bold" }}>
        {table_idx}
      </span>
    </div>
  );
};
export default TableDetection;
