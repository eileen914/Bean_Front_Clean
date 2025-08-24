import styles from "./TableDetection.module.css";

const TableDetection = ({
  width = 100,
  height = 100,
  x_position = 0,
  y_position = 0,
  shape = "rectangle",
  seat_number = "4인석",
  floorplan_id = 0,
  table_idx = 0,
  selected = false,
  onClick,
}) => {
  // 중심 좌표(x_position, y_position) 기준으로 위치 계산
  const left = x_position - width / 2;
  const top = y_position - height / 2;
  const style = {
    left,
    top,
    width,
    height,
  };
  const classNames = [
    styles.tableBox,
    shape === "circle" ? styles.circle : "",
    selected ? styles.selected : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={classNames} style={style} onClick={onClick}>
      <span className={styles.tableBoxLabel}>{table_idx + 1}</span>
    </div>
  );
};
export default TableDetection;
