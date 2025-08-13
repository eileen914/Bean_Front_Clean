import mappin from "../assets/mappin.svg";

/**
 * MapPins
 * - text: "3/10" 같은 표시 텍스트
 * - palette: { bg, fg, border } 색상 반영
 * - options.injectStyle: true면 스타일 1회 주입
 * 반환: CustomOverlay content로 넣을 DOM 노드
 */
export default function MapPins(text = "", palette = {}, options = { injectStyle: true }) {
  if (options?.injectStyle !== false) injectPinStyleOnce();
  const fg = palette.fg ?? "#2b1407ff";

  const root = document.createElement("div");
  root.className = "pins-frame";
  root.style.backgroundColor = 'transparent';
  root.style.border = "none";
  root.style.borderRadius = "10px";

  // 텍스트
  const label = document.createElement("div");
  label.className = "pins-text-wrapper";
  label.textContent = text;
  label.style.color = fg;

  // 아이콘
  const icon = document.createElement("div");
  icon.className = "pins-icon";
  icon.style.backgroundColor = fg; // fg 색상 적용

  root.appendChild(label);
  root.appendChild(icon);
  return root;
}

/** 한 번만 스타일 주입 */
function injectPinStyleOnce() {
  const STYLE_ID = "pins-style-v1";
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

  /* 프레임 크기(아이콘 폭 기준). 필요시 조정 */
  width: 40px;
  padding: 2px 3px; /* 텍스트 여백 조금 */
  pointer-events: auto;
  user-select: none;
  transform: translateZ(0);
  box-sizing: border-box;
}

.pins-frame .pins-text-wrapper {
  font-family: "Inter", "Lexend", Helvetica, Arial, sans-serif;
  font-size: 17px;
  background-color: #ffffff;
  padding: 3px;
  font-weight: 600;
  line-height: 1;
  margin-top: -1px;
  text-align: center;
  white-space: nowrap;

  max-width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pins-frame .pins-icon {
  width: 30px;
  height: 30px;
  background-color: currentColor;
  -webkit-mask: url(${mappin}) center/contain no-repeat;
  mask: url(${mappin}) center/contain no-repeat;
}
`.trim();

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
