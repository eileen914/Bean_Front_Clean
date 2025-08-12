/* global kakao */
import pinbean from './pinbean.svg';

let _imgCache = null; // pinbean 이미지 캐시

function loadImage(src) {
  if (_imgCache) return Promise.resolve(_imgCache);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // 동일 출처면 없어도 되지만 호환성 위해
    img.onload = () => {
      _imgCache = img;
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * 중앙정렬 + 텍스트 13px + 아이콘 18px + 아이콘 뒤 17px 흰 원 + 아이콘 단색(border 색)
 * @param {string} text 예: "3/10"
 * @param {{bg?: string, fg?: string, border?: string, radius?: number}} palette
 * @returns {Promise<kakao.maps.MarkerImage>}
 */
export default async function createSeatsPinImage(text, palette = {}) {
  const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

  // 레이아웃(주신 CSS 박스 기준)
  const cssWidth = 68;        // 전체 너비
  const cssHeight = 33;       // 전체 높이
  const iconSize = 16;        // pinbean 크기
  const gap = 4;              // 아이콘-텍스트 간격
  const borderWidthCss = 0.5;   // 1px 보더
  const fontSize = 11;        // 텍스트 크기
  const sidePadding = 2;      // 좌우 여유(텍스트 말줄임 계산용)

  // 팔레트
  const bg = palette.bg ?? 'rgba(255,255,255,0.95)';
  const fg = palette.fg ?? '#2b1407ff';
  const border = palette.border ?? '#2b1407ff';
  const radius = (palette.radius ?? 14) * DPR;

  // 캔버스
  const width = cssWidth * DPR;
  const height = cssHeight * DPR;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');

  // 둥근 사각형 path
  const roundRect = (x, y, w, h, r) => {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  };

  // 배경 + 보더
  ctx.fillStyle = bg;
  roundRect(0.5 * DPR, 0.5 * DPR, (cssWidth - 1) * DPR, (cssHeight - 1) * DPR, radius);
  ctx.fill();

  ctx.lineWidth = borderWidthCss * DPR;
  ctx.strokeStyle = border;
  roundRect(0.5 * DPR, 0.5 * DPR, (cssWidth - 1) * DPR, (cssHeight - 1) * DPR, radius);
  ctx.stroke();

  // 텍스트 준비(폰트 설정 → 말줄임 → 측정)
  ctx.font = `600 ${fontSize * DPR}px "Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', Arial`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';

  const ellipsis = '…';
  const maxTextPx = (cssWidth - sidePadding * 2) * DPR - (iconSize + gap) * DPR;
  let drawText = String(text ?? '');
  const measure = (s) => ctx.measureText(s).width;
  if (measure(drawText) > maxTextPx) {
    while (drawText.length > 0 && measure(drawText + ellipsis) > maxTextPx) {
      drawText = drawText.slice(0, -1);
    }
    drawText += ellipsis;
  }
  const textWidth = measure(drawText);

  // 중앙정렬: (아이콘 + gap + 텍스트) 총 폭을 가운데 배치
  const totalContentWidth = (iconSize * DPR) + (gap * DPR) + textWidth;
  const startX = Math.max(0, (width - totalContentWidth) / 2);

  // 좌표
  const iconX = startX;
  const iconY = (height - iconSize * DPR) / 2;
  const textX = Math.round((iconX + iconSize * DPR + gap * DPR));
  const textY = Math.round(height / 2);

  // 아이콘 로드 & 그리기 (뒤에 17px 흰 원 → 아이콘 단색화 → 메인에 배치)
  try {
    const img = await loadImage(pinbean);
    const s = iconSize * DPR;

    // 아이콘 중심 좌표
    const centerX = iconX + s / 2;
    const centerY = iconY + s / 2;

    // (1) 배경 원: #ffffff, 지름 17px → 반지름 8.5px
    ctx.beginPath();
    ctx.arc(centerX, centerY, 12 * DPR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // (2) 오프스크린에서 단색화(source-in)
    const off = document.createElement('canvas');
    off.width = s;
    off.height = s;
    const offCtx = off.getContext('2d');
    offCtx.drawImage(img, 0, 0, s, s);
    offCtx.globalCompositeOperation = 'source-in';
    offCtx.fillStyle = border; // 아이콘 색 = border 색
    offCtx.fillRect(0, 0, s, s);

    // (3) 메인 캔버스에 배치
    ctx.drawImage(off, iconX, iconY, s, s);
  } catch (e) {
    console.error('pinbean 로드 실패:', e);
    // 실패 시에도 레이아웃 유지: 흰 원만 그려줌
    const s = iconSize * DPR;
    const centerX = iconX + s / 2;
    const centerY = iconY + s / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8.5 * DPR, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // 텍스트
  ctx.fillStyle = fg;
  ctx.fillText(drawText, textX, textY);

  // 마커 이미지 반환 (보안 이슈 폴백 포함)
  let imageSrc;
  try {
    imageSrc = canvas.toDataURL('image/png');
  } catch (err) {
    console.warn('toDataURL 실패(보안) → 폴백 사용:', err);
    const fb = document.createElement('canvas');
    fb.width = width;
    fb.height = height;
    const fctx = fb.getContext('2d');

    fctx.fillStyle = bg;
    roundRect(0.5 * DPR, 0.5 * DPR, (cssWidth - 1) * DPR, (cssHeight - 1) * DPR, radius);
    fctx.fill();
    fctx.lineWidth = borderWidthCss * DPR;
    fctx.strokeStyle = border;
    roundRect(0.5 * DPR, 0.5 * DPR, (cssWidth - 1) * DPR, (cssHeight - 1) * DPR, radius);
    fctx.stroke();

    fctx.font = `600 ${fontSize * DPR}px "Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', Arial`;
    fctx.textBaseline = 'middle';
    fctx.textAlign = 'center';
    fctx.fillStyle = fg;
    fctx.fillText(drawText, width / 2, height / 2);

    imageSrc = fb.toDataURL('image/png');
  }

  const imageSize = new kakao.maps.Size(cssWidth, cssHeight);
  const imageOption = { offset: new kakao.maps.Point(cssWidth / 2, cssHeight) }; // 아래 중앙 기준

  return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
}
