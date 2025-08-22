import mappin from "../assets/mappin.svg";
import coffee_bean from "../assets/coffee-bean.svg";
import coffee_mug from "../assets/coffee-mug.svg";
import filled_bean_pin from "../assets/fillbeanpin.png";
import final_pin from "../assets/final_pin.png";

export default function MapPins(text = "", palette = {}, options = {}) {
  const { injectStyle = true, pinSize = 23, fontSize = 15 } = options || {};

  if (injectStyle) injectPinStyleOnce();

  const fg = palette.fg ?? "#685D4A";

  // 루트
  const root = document.createElement("div");
  root.className = "pins-frame";
  root.style.setProperty("--pin-size", `${pinSize}px`);
  root.style.setProperty("--pin-font", `${fontSize}px`);

  // 라벨 (필요 시 다색 처리)
  const label = document.createElement("div");
  label.className = "pins-text-wrapper";

  const match = String(text).match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
  const RED = "#930c00ff";
  const BROWN = "#685D4A";

  if (match && typeof fg === "string" && fg.toLowerCase() === RED) {
    // ≤2 케이스는 palette.fg가 RED로 들어옴 → 숫자만 RED, 나머진 BROWN
    const avail = match[1];
    const total = match[2];

    const spanAvail = document.createElement("span");
    spanAvail.textContent = avail;
    spanAvail.style.color = RED;

    const spanSlash = document.createElement("span");
    spanSlash.textContent = "/";
    spanSlash.style.color = BROWN;

    const spanTotal = document.createElement("span");
    spanTotal.textContent = total;
    spanTotal.style.color = BROWN;

    label.appendChild(spanAvail);
    label.appendChild(spanSlash);
    label.appendChild(spanTotal);
  } else {
    // 그 외에는 단색(기존 동작)
    label.textContent = text;
    label.style.color = fg;
  }

  // 아이콘 (mask 사용 X, 완성 이미지를 그대로 표시)
  const icon = document.createElement("div");
  icon.className = "pins-icon";

  root.appendChild(label);
  root.appendChild(icon);
  return root;
}

/** 한 번만 스타일 주입 */
function injectPinStyleOnce() {
  const STYLE_ID = "pins-style-v7"; // 버전업으로 캐시 무효화
  if (document.getElementById(STYLE_ID)) return;

  const css = `
@font-face {
  font-family: 'Lexend';
  src: url('../assets/fonts/Lexend-VariableFont_wght.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* === Pins styles (CustomOverlay DOM용) === */
.pins-frame {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;

  /* 프레임 폭 = 아이콘폭 + 여백 */
  width: calc(var(--pin-size, 22px) + 10px);
  padding: 2px 3px;
  pointer-events: auto;
  user-select: none;
  transform: translateZ(0);
  box-sizing: border-box;
}

.pins-frame .pins-text-wrapper {
  font-family: "Inter", "Lexend", Helvetica, Arial, sans-serif;
  font-size: var(--pin-font, 13px);
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1px 3px;
  font-weight: 600;
  line-height: 1;
  margin-top: -1px;
  text-align: center;
  white-space: nowrap;

  /* 라벨 최대폭은 아이콘 크기 비례 */
  max-width: calc(var(--pin-size, 22px) * 1.9);
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 아이콘: 콩 포함된 완성 이미지를 그대로 표시 */
.pins-frame .pins-icon {
  width: var(--pin-size, 22px);
  aspect-ratio: 45 / 63; /* mappin 비율에 맞게 자동 높이 */
  background: url(${filled_bean_pin}) center / contain no-repeat;
  pointer-events: none;
}
`.trim();

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
