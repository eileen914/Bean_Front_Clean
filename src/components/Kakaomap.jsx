
/**
 * Kakaomap 컴포넌트
 * - props: cafeList (카페 정보 배열, 각 객체는 id, name, owner, address, photo_urls 등 포함)
 * - 카카오맵을 렌더링하고, cafeList의 위치에 커스텀 핀(마커)을 표시
 * - 마커 클릭 시 해당 카페 상세 페이지로 이동
 */
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MapPins from "../assets/seats_pin2.jsx";

function Kakaomap({ cafeList = [] }) {
  const mapRef = useRef(null); // 지도 DOM 참조
  const navigate = useNavigate(); // 페이지 이동 함수

  function getRandomSeats() {
    const right = Math.floor(Math.random() * 11) + 10;
    const left = Math.floor(Math.random() * (right + 1));
    return `${left}/${right}`;
  }

  useEffect(() => {
    // 카카오맵 SDK가 window에 로드되어 있는지 확인
    if (!window.kakao?.maps) {
      console.error("Kakao Maps SDK가 아직 로드되지 않았습니다.");
      return;
    }
    if (!mapRef.current) return;

    const { kakao } = window;

    // 지도 초기화 (기본 좌표: 서울대입구)
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.4781, 126.9527),
      level: 3,
    });
    const bounds = new kakao.maps.LatLngBounds();

    // 좌석 정보 파싱 함수 (예시: "3/10" → { available:3, total:10 })
    const parseSeats = (s) => {
      if (!s || typeof s !== "string") return { available: 0, total: 0 };
      const [a, b] = s.split("/");
      return { available: Number(a) || 0, total: Number(b) || 0 };
    };

    // 빈자리 수에 따라 핀 색상 반환
    const paletteFor = (available) => {
      if (available === 0) return { fg: "rgba(53, 53, 53, 0.95)" };
      if (available <= 2) return { fg: "#930c00ff" };
      return { fg: "#4b2000ff" };
    };

    // 카페 리스트 순회하며 지도에 핀 표시
    cafeList.forEach(async (cafe) => {
      try {
        // 카페명으로 좌표 검색 (카카오 장소 검색 API)
        const q = encodeURIComponent(cafe.address);
        const res = await fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${q}`,
          {
            headers: {
              Authorization: "KakaoAK 85343d921113ffdf032722fcc089ebec",
            },
          }
        );
        const data = await res.json();
        const doc = data?.documents?.[0];
        if (!doc) {
          console.warn(`${cafe.name}에 대한 장소를 찾지 못했습니다.`);
          return;
        }

        // 좌표 추출 및 지도 bounds 확장
        const x = Number(doc.x), y = Number(doc.y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        const pos = new kakao.maps.LatLng(y, x);
        bounds.extend(pos);

        // 좌석 정보(예시값) 및 색상 팔레트
        const { available, total } = parseSeats(getRandomSeats());
        const palette = paletteFor(available);

        // 커스텀 핀 DOM 생성 및 클릭 핸들러 등록
        const pinDom = MapPins(`${available}/${total}`, palette);
        pinDom.style.cursor = "pointer";
        pinDom.onclick = () => {
          navigate("/user-cafe-detail", {
            state: {
              cafeId: cafe.id,
              ownerId: cafe.owner,
              cafeName: cafe.name,
              cafeAddress: cafe.address,
              cafeImages: cafe.photo_urls,
            },
          });
        };

        // 지도에 커스텀 오버레이(핀) 추가
        const overlay = new kakao.maps.CustomOverlay({
          position: pos,
          content: pinDom, // palette 색 반영된 DOM
          xAnchor: 0.5,
          yAnchor: 1.0,
          zIndex: 4,
          clickable: true,
        });
        overlay.setMap(map);
      } catch (e) {
        console.error(`${cafe.name} 검색/표시 중 오류:`, e);
      }
    });

    // 모든 핀이 표시된 후 bounds로 지도 영역 자동 조정
    setTimeout(() => {
      if (!bounds.isEmpty()) map.setBounds(bounds);
    }, 500);
  }, [cafeList, navigate]);

  // 지도 컨테이너 렌더링
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Kakaomap;