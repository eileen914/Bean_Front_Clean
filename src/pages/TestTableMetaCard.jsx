// 테이블 메타 정보 카드 테스트 페이지
// - TableMetaCard 컴포넌트 렌더링 및 이벤트 핸들러 연결

import React from "react";
import TableMetaCard from "../components/TableMetaCard";

export default function TestTableMetaCard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#F9F8F4",
      }}
    >
      {/* 테이블 메타 정보 카드 컴포넌트 */}
      <TableMetaCard
        tableNo="7"
        onChange={(payload) => console.log("변경:", payload)}
      />
    </div>
  );
}
