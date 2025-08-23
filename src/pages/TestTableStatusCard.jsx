// 테이블 상태 카드 테스트 페이지
// - TableStatusCard 컴포넌트 렌더링 및 이벤트 핸들러 연결

import React from "react";
import TableStatusCard from "../components/TableStatusCard";
import TakenSeat from "../components/TakenSeat";
import UserSearch from "../components/UserSearch";


export default function TestTableStatusCard(props) {
  return (
    // 중앙 정렬된 테스트 UI
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9F8F4",
      }}
    >
      {/* 테이블 상태 카드 컴포넌트 */}
      <TableStatusCard
        tableNo="7-1"
        elapsedLabel="0시간 38분 동안 사용중"
        checkinTime="15:03"
        expectedOutTime="17:33"
        remainingLabel="남은 시간 1시간 15분"
        status="in-use"
        onCheckout={() => alert("퇴장 처리")}
      />
      <UserSearch />
    </div>
  );
}
