// 좌석 착석 테스트 페이지
// - SeatStartCard 컴포넌트 렌더링 및 이벤트 핸들러 연결

import React from "react";
import SeatStartCard from "../components/SeatStartCard"; // 경로는 프로젝트 구조에 맞게 수정

export default function TestSeatStartCard() {
  // 착석 시작 이벤트 핸들러
  const handleStart = ({ tableNo, minutes, checkinAt, expectedOutAt }) => {
    alert(
      `${tableNo}번 좌석 착석 처리\n` +
        `사용시간: ${minutes}분\n` +
        `입장시간: ${checkinAt.toLocaleTimeString()}\n` +
        `퇴장예상: ${expectedOutAt.toLocaleTimeString()}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9F8F4",
      }}
    >
      {/* 좌석 착석 카드 컴포넌트 */}
      <SeatStartCard
        tableNo="6-2"
        now={new Date("2025-08-14T15:03:00")}
        options={[90, 120, 180]}
        defaultMinutes={90}
        onStart={handleStart}
      />
    </div>
  );
}
