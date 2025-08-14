import React, { useEffect, useRef } from 'react';
import cafe_list from '../assets/cafe_list.jsx';
import MapPins from '../assets/seats_pin2.jsx'; 
import createSeatsPinImage from '../assets/new_seat_pin.jsx'

function Kakaomap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps SDK가 아직 로드되지 않았습니다.');
      return;
    }
    if (!mapRef.current) return;

    const { kakao } = window;

    // 지도 초기화
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.4781, 126.9527),
      level: 3,
    });
    const bounds = new kakao.maps.LatLngBounds();

    // "3/10" → { available:3, total:10 }
    const parseSeats = (s) => {
      if (!s || typeof s !== 'string') return { available: 0, total: 0 };
      const [a, b] = s.split('/');
      return { available: Number(a) || 0, total: Number(b) || 0 };
    };

    // 상태별 팔레트 (빈자리 수에 따라 색상 유지)
    const paletteFor = (available) => {
      if (available === 0) {
        return { fg: 'rgba(53, 53, 53, 0.95)'}; 
      }
      if (available <= 2) {
        return { fg: '#930c00ff'};           
      }
      return { fg: '#4b2000ff'};        
    };

    const jobs = cafe_list.map(async (cafe) => {
      try {
        const q = encodeURIComponent(cafe.name);
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/search/keyword.json?query=${q}`,
          {
            headers: {
              Authorization: 'KakaoAK 85343d921113ffdf032722fcc089ebec',
            },
          }
        );
        const data = await res.json();
        const doc = data?.documents?.[0];
        if (!doc) {
          console.warn(`${cafe.name}에 대한 장소를 찾지 못했습니다.`);
          return;
        }

        const x = Number(doc.x), y = Number(doc.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;

        const pos = new kakao.maps.LatLng(y, x);
        bounds.extend(pos);

        const { available, total } = parseSeats(cafe.seats);
        const palette = paletteFor(available);

        // ★ Marker 대신 CustomOverlay 사용 (DOM 핀)
        const overlay = new kakao.maps.CustomOverlay({
          position: pos,
          content: MapPins(`${available}/${total}`, palette), // palette 색 반영된 DOM
          xAnchor: 0.5,
          yAnchor: 1.0, // 아래 중앙이 좌표에 닿도록
          zIndex: 4,
          clickable: true,
        });
        overlay.setMap(map);
      } catch (e) {
        console.error(`${cafe.name} 검색/표시 중 오류:`, e);
      }
    });

    Promise.all(jobs).then(() => {
      if (!bounds.isEmpty()) map.setBounds(bounds);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Kakaomap;

