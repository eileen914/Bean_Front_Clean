/* global kakao */

// 둥근 배지 + 아래 꼬리 + 테두리/내부 텍스트가 포함된 핀
// palette: { bg, fg, border } 형태로 색상 전달 (없으면 기본값 사용)
function createSeatsPinImage(text, palette = {}) {
  const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

  // 논리 크기 (CSS상 보이는 크기)
  const cssWidth = 59;
  const cssHeight = 54; // 아래 꼬리 포함
  const width = cssWidth * DPR;
  const height = cssHeight * DPR;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');

  // 팔레트 기본값
  const bg = palette.bg ?? '#F4F0E5';
  const fg = palette.fg ?? '#2b1407ff';
  const border = palette.border ?? '#2b1407ff';

  // 배지 영역 값
  const pad = 8 * DPR;
  const badgeW = (cssWidth - pad * 2 / DPR) * DPR;
  const badgeH = 32 * DPR;
  const badgeX = pad;
  const badgeY = 10 * DPR;
  const radius = 8 * DPR;

  // 둥근 사각형 그리기 함수
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

  // 배경(배지)
  ctx.fillStyle = bg;
  ctx.strokeStyle = border;
  ctx.lineWidth = 1.25 * DPR;
  roundRect(badgeX, badgeY, badgeW, badgeH, radius);
  ctx.fill();
  ctx.stroke();

  // 아래 꼬리 (삼각형)
  const tailWidth = 12 * DPR;
  const tailHeight = 10 * DPR;
  const tailCenterX = width / 2;
  const tailTopY = badgeY + badgeH;
  ctx.beginPath();
  ctx.moveTo(tailCenterX, tailTopY + tailHeight);     // 아래 꼭지점
  ctx.lineTo(tailCenterX - tailWidth / 2, tailTopY);  // 좌측 위
  ctx.lineTo(tailCenterX + tailWidth / 2, tailTopY);  // 우측 위
  ctx.closePath();
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.stroke();

  // 텍스트 (가운데 정렬)
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 숫자가 두 자리/세 자리여도 잘 보이는 굵기/크기
  // (DPR 반영해서 선명하게)
  const fontPx = 13 * DPR;
  ctx.font = `bold ${fontPx}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Noto Sans KR', Arial`;

  const textX = width / 2;
  const textY = badgeY + badgeH / 2;
  // 긴 텍스트 대비해서 살짝 줄이기
  let drawText = String(text ?? '');
  if (drawText.length > 6) {
    drawText = drawText.slice(0, 6);
  }
  ctx.fillText(drawText, textX, textY);

  // 고해상도 DPI에서 깨끗하게
  const imageSrc = canvas.toDataURL('image/png');
  const imageSize = new kakao.maps.Size(cssWidth, cssHeight);

  // 마커 앵커를 '아래 중앙'으로: (x=중앙, y=전체 높이)
  const imageOption = { offset: new kakao.maps.Point(cssWidth / 2, cssHeight) };

  return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
}

export default createSeatsPinImage;
