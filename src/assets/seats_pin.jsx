/* global kakao */

function createSeatsPinImage(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 50;
  canvas.height = 50;
  const ctx = canvas.getContext('2d');

  // 배경
  ctx.fillStyle = '#F4F0E5';  // 원하는 색
  ctx.strokeStyle = '#2b1407ff';  // 테두리 색
  ctx.lineWidth = 1;  // 테두리 두께
  ctx.lineJoin = 'round';  // 모서리 둥글게
  ctx.beginPath();
  ctx.strokeRect(5, 15, 40, 20); // x, y, width, height
  ctx.fillRect(5,15, 40, 20); // x, y, width, height

  // 텍스트
  ctx.fillStyle = '#2b1407ff';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 25, 25);  // 중심에 텍스트

  const imageSrc = canvas.toDataURL();
  const imageSize = new kakao.maps.Size(50, 50);
  const imageOption = { offset: new kakao.maps.Point(25, 50) };

  return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
}

export default createSeatsPinImage