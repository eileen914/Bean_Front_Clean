import React, { useMemo, useState } from "react";
import "./SeatStartCard.css"; // 기존 CSS 재사용 + 아래 추가 CSS 몇 줄 필요
import { updateTable } from "../apis/api";

/**
 * TableMetaCard
 * 인원수(단일 선택), 형태(다중 선택) + 기타 입력
 *
 * Props
 * - tableNo: string|number
 * - tableId: string|number (필수)
 * - capacityOptions: number[] | string[]  (기본: ["1인","2인","4인","6인 이상"])
 * - typeOptions: string[]                 (기본: [...아래 기본값])
 * - defaultCapacity: string
 * - defaultTypes: string[]
 * - onChange (payload) → { tableNo, capacity, types, etcInputs:{ typeEtc } }
 * - onSaved?: (data) => void
 * - disabled: boolean
 */
export default function TableMetaCard({
  tableId,
  tableNo,
  capacityOptions,
  typeOptions,
  defaultCapacity,
  defaultTypes,
  onChange,
  onSaved,
  disabled = false,
}) {
  const caps = useMemo(
    () => capacityOptions ?? ["1인석", "2인석", "4인석", "6인 이상 단체석"],
    [capacityOptions]
  );
  const types = useMemo(
    () =>
      typeOptions ?? [
        "기본(사각) 테이블",
        "원형 테이블",
        "바 테이블 / 닷지석",
        "반원/코너 테이블",
        "커뮤니티(공유형) 자리",
        "쇼파 자리",
      ],
    [typeOptions]
  );

  const [capacity, setCapacity] = useState(defaultCapacity ?? caps[0]);
  const [selType, setSelType] = useState(
    (defaultTypes && defaultTypes[0]) ?? types[0]
  );
  const [typeEtc, setTypeEtc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // onChange로 바깥에 알려줄 때, 호환성을 위해 types:[selType, ...(기타?)] 유지
  const getTypesForEmit = () => {
    const arr = selType ? [selType] : [];
    return typeEtc?.trim() ? [...arr, typeEtc.trim()] : arr;
  };

  const emit = (next = {}) => {
    onChange?.({
      tableNo,
      capacity,
      types: getTypesForEmit(), // ["원형 테이블", "직접입력"...]
      etcInputs: { typeEtc },
      ...next,
    });
  };

  const onPickCapacity = (v) => {
    setCapacity(v);
    emit({ capacity: v });
  };
  const onPickType = (v) => {
    setSelType(v); // 단일 선택
    emit({ types: [v] });
  };

  const toShape = (typeLabel, etc) => {
    if (typeLabel?.includes("원형")) return "circle";
    if (typeLabel?.includes("기본(사각)")) return "rectangle";
    if (typeLabel?.includes("반원") || typeLabel?.includes("코너"))
      return "corner";
    if (typeLabel?.includes("바 테이블") || typeLabel?.includes("닷지석"))
      return "bar";
    if (typeLabel?.includes("커뮤니티")) return "community";
    if (typeLabel?.includes("쇼파")) return "sofa";
    if (etc?.trim()) return "custom";
    return "rectangle";
  };

  const handleSave = async () => {
    if (!tableId) {
      setError("tableId가 없습니다.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        seat_number: capacity,
        shape: toShape(selType, typeEtc),
      };
      const { status, data } = await updateTable(tableId, payload);
      if (status !== 200) throw { status, data, message: "Unexpected status" };
      onSaved?.(data);
    } catch (e) {
      console.error("[table save error]", e);
      const detail =
        typeof e?.data === "object" ? JSON.stringify(e.data) : e?.data || "";
      setError(`저장 오류 (${e?.status || 0}) ${e?.message || ""} ${detail}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      className={`ss-card ${disabled ? "is-disabled" : ""}`}
      role="group"
      aria-label={`${tableNo}번 테이블 속성 설정`}
    >
      <header className="ss-header">
        <h3 className="ss-title">
          <strong>{tableNo}</strong> 번 테이블
        </h3>
      </header>

      {/* 인원수 */}
      <div className="ss-section">
        <div className="ss-label">인원수</div>
        <div className="ss-options" role="radiogroup" aria-label="인원수">
          {caps.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={capacity === c}
              className={`ss-opt ${capacity === c ? "is-active" : ""}`}
              onClick={() => onPickCapacity(c)}
              disabled={disabled}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 형태 */}
      <div className="ss-section">
        <div className="ss-label">형태</div>
        <div className="ss-options" role="radiogroup" aria-label="형태">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={selType === t}
              className={`ss-opt ${selType === t ? "is-active" : ""}`}
              onClick={() => onPickType(t)}
              disabled={disabled || saving}
            >
              {t}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="ss-input"
          placeholder="기타 (직접입력)"
          value={typeEtc}
          onChange={(e) => {
            setTypeEtc(e.target.value);
            emit({ etcInputs: { typeEtc: e.target.value } });
          }}
          disabled={disabled || saving}
        />
      </div>

      {/* 저장 버튼 & 에러 */}
      <div className="ss-actions">
        {error && (
          <div style={{ color: "#d33", fontSize: "0.85rem", marginBottom: 8 }}>
            {error}
          </div>
        )}
        <button
          className="ss-btn"
          type="button"
          onClick={handleSave}
          disabled={disabled || saving}
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </section>
  );
}
