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
      <TableMetaCard
        tableNo="7"
        onChange={(payload) => console.log("변경:", payload)}
      />
    </div>
  );
}
