export function fmtHHMM(date) {
  let d;
  if (typeof date === "number" || typeof date === "string") {
    d = new Date(date);
  } else {
    d = date;
  }
  if (!(d instanceof Date) || isNaN(d.getTime())) return ""; // 올바른 Date 객체가 아니면 빈 문자열 반환
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

export function fmtDuration(ms) {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}시간 ${minutes}분`;
}
