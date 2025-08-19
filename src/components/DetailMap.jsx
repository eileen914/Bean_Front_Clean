import React, { useEffect, useRef } from 'react';

function DetailMap({ cafeAddress = "서울 관악구 관악로13길 20", level = 2 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // SDK 준비 체크
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps SDK가 아직 로드되지 않았습니다.');
      return;
    }
    if (!mapRef.current) return;

    const { kakao } = window;

    // 지도 초기화 (임시 중심: 서울대입구역 근처)
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.4781, 126.9527),
      level,
    });

    // 주소 없으면 기본 위치만 표시
    if (!cafeAddress || typeof cafeAddress !== 'string') {
      console.warn('cafeAddress가 비어 있어 기본 중심으로 표시합니다.');
      return;
    }

    // 주소 → 좌표 변환
    if (!kakao.maps.services) {
      console.error('kakao.maps.services가 없습니다. SDK에 libraries=services를 포함하세요.');
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(cafeAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result && result.length > 0) {
        const { x, y } = result[0]; // x: lng, y: lat (문자열)
        const center = new kakao.maps.LatLng(Number(y), Number(x));

        // ★ 핀/마커 없이 중심만 이동
        map.setCenter(center);
        map.setLevel(level);
      } else {
        console.warn(`주소 변환 실패: ${status} | 입력 주소: ${cafeAddress}`);
      }
    });
  }, [cafeAddress, level]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default DetailMap;
