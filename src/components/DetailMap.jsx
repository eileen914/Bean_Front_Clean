// 카페 상세 지도 컴포넌트
// - 카카오맵에 주소 기반 지도와 커스텀 핀을 표시

import React, { useEffect, useRef } from "react";
import MapPins from "../assets/seats_pin2";

function DetailMap({ cafeAddress = "서울 관악구 관악로13길 20", level = 2 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Kakao Maps SDK 로드 및 지도 생성
    if (!window.kakao?.maps || !mapRef.current) return;
    const { kakao } = window;
    const map = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.LatLng(37.4781, 126.9527),
      level,
    });
    // 주소가 없으면 기본 중심
    if (!cafeAddress || typeof cafeAddress !== "string") return;
    // Geocoder 준비 확인
    if (!kakao.maps.services) return;
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소 → 좌표 변환 후 지도 중심 이동 및 커스텀 핀 표시
    geocoder.addressSearch(cafeAddress, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result?.length > 0) {
        const { x, y } = result[0];
        const center = new kakao.maps.LatLng(Number(y), Number(x));
        map.setCenter(center);
        map.setLevel(level);
        // 커스텀 핀 생성 및 지도에 오버레이
        const pinDom = MapPins("", { fg: "transparent" }, { pinSize: 24, fontSize: 11 });
        pinDom.querySelector(".pins-text-wrapper")?.style.setProperty("display", "none");
        new kakao.maps.CustomOverlay({ position: center, content: pinDom, yAnchor: 1 }).setMap(map);
      }
    });
  }, [cafeAddress, level]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* 지도 영역 */}
      <div id="map" ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default DetailMap;
