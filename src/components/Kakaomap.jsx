import React, { useEffect } from 'react';
import cafe_list from '../assets/cafe_list.jsx';
import createSeatsPinImage from '../assets/seats_pin.jsx';

function Kakaomap() {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps SDK가 아직 로드되지 않았습니다.');
      return;
    }

    const { kakao } = window; // ✅ useEffect 안으로 이동
    const container = document.getElementById('map');

    const defaultCenter = new kakao.maps.LatLng(37.4781, 126.9527);
    const options = {
      center: defaultCenter,
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const bounds = new kakao.maps.LatLngBounds();

    const fetchPromises = cafe_list.map((cafe) => {
      return fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${cafe.name}`, {
        headers: {
          Authorization: 'KakaoAK 85343d921113ffdf032722fcc089ebec',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data || !data.documents || data.documents.length === 0) {
            console.warn(`${cafe.name}에 대한 장소를 찾을 수 없습니다.`);
            return null;
          }

          const { x, y } = data.documents[0];
          const position = new kakao.maps.LatLng(y, x);

          const pinImage = createSeatsPinImage(cafe.seats);

          new kakao.maps.Marker({
            map: map,
            position: position,
            image: pinImage,
          });

          bounds.extend(position);
        })
        .catch((error) => {
          console.error(`${cafe.name} 검색 중 오류 발생:`, error);
        });
    });

    Promise.all(fetchPromises).then(() => {
      map.setBounds(bounds);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        id="map"
        style={{
          width: '420px',
          height: '831px',
        }}
      ></div>
    </div>
  );
}

export default Kakaomap;
