import React from "react";
import SeatMetaCard from "../components/SeatMetaCard";

export default function TestSeatMetaCard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#F9F8F4",
      }}
    >
      <SeatMetaCard
        seatNo="7-1"
        featureOptions={["콘센트 자리", "창가 자리", "야외(테라스)"]}
        defaultFeatures={["콘센트 자리"]}
        onChange={(payload) => console.log("변경:", payload)}
      />
    </div>
  );
}
