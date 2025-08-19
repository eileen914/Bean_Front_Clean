import React, { useEffect, useRef } from "react";
import MapPins from "../assets/seats_pin2"; // seats_pin2.jsx import

function DetailMap({ cafeAddress = "서울 관악구 관악로13길 20", level = 2 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps SDK가 아직 로드되지 않았습니다.");
      return;
    }
    if (!mapRef.current) return;

    const { kakao } = window;
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.4781, 126.9527),
      level,
    });

    if (!cafeAddress || typeof cafeAddress !== "string") {
      console.warn("cafeAddress가 비어 있어 기본 중심으로 표시합니다.");
      return;
    }

    if (!kakao.maps.services) {
      console.error(
        "kakao.maps.services가 없습니다. SDK에 libraries=services를 포함하세요."
      );
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(cafeAddress, (result, status) => {
      if (
        status === kakao.maps.services.Status.OK &&
        result &&
        result.length > 0
      ) {
        const { x, y } = result[0];
        const center = new kakao.maps.LatLng(Number(y), Number(x));
        map.setCenter(center);
        map.setLevel(level);

        // ★ 커스텀 핀 추가
        const pinDom = MapPins(
          "",
          { fg: "transparent" },
          { pinSize: 24, fontSize: 11 }
        );
        if (pinDom.querySelector(".pins-text-wrapper")) {
          pinDom.querySelector(".pins-text-wrapper").style.display = "none";
        }
        const overlay = new kakao.maps.CustomOverlay({
          position: center,
          content: pinDom,
          yAnchor: 1,
        });
        overlay.setMap(map);
      } else {
        console.warn(`주소 변환 실패: ${status} | 입력 주소: ${cafeAddress}`);
      }
    });
  }, [cafeAddress, level]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default DetailMap;
