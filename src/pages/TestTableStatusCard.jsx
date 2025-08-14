import React from "react";
import TableStatusCard from "../components/TableStatusCard";

export default function TestTableStatusCard(props) {
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
      <TableStatusCard
        tableNo="7-1"
        elapsedLabel="0시간 38분 동안 사용중"
        checkinTime="15:03"
        expectedOutTime="17:33"
        remainingLabel="남은 시간 1시간 15분"
        status="in-use"
        onCheckout={() => alert("퇴장 처리")}
      />
    </div>
  );
}
