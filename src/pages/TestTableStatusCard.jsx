import React from "react";
import TableStatusCard from "../components/TableStatusCard";

export default function TestTableStatusCard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f8f4",
      }}
    >
      <TableStatusCard
        tableNumber={7}
        usageTime="0시간 38분"
        checkInTime="15:03"
        expectedCheckOut="17:33"
        remainingTime="1시간 15분"
        onLeave={() => alert("퇴장 처리")}
      />
    </div>
  );
}
