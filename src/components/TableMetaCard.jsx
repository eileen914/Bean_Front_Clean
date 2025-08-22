import React, { useMemo, useState } from "react";
import "./SeatStartCard.css"; // 기존 CSS 재사용 + 아래 추가 CSS 몇 줄 필요

/**
 * TableMetaCard
 * 인원수(단일 선택), 형태/기능(다중 선택) + 기타 입력
 *
 * Props
 * - tableNo: string|number
 * - capacityOptions: number[] | string[]  (기본: ["1인","2인","4인","6인 이상"])
 * - typeOptions: string[]                 (기본: [...아래 기본값])
 * - featureOptions: string[]              (기본: [...아래 기본값])
 * - defaultCapacity: string
 * - defaultTypes: string[]
 * - defaultFeatures: string[]
 * - onChange (payload) → { tableNo, capacity, types, features, etcInputs:{ typeEtc, featureEtc } }
 * - disabled: boolean
 */
export default function TableMetaCard({
  tableNo,
  capacityOptions,
  typeOptions,
  featureOptions,
  defaultCapacity,
  defaultTypes,
  defaultFeatures,
  onChange,
  disabled = false,
}) {
  const caps = useMemo(
    () => capacityOptions ?? ["1인", "2인", "4인", "6인 이상"],
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
  const feats = useMemo(
    () => featureOptions ?? ["콘센트 자리", "창가 자리", "야외(테라스)"],
    [featureOptions]
  );

  const [capacity, setCapacity] = useState(defaultCapacity ?? caps[0]);
  const [selTypes, setSelTypes] = useState(new Set(defaultTypes ?? []));
  const [selFeats, setSelFeats] = useState(new Set(defaultFeatures ?? []));
  const [typeEtc, setTypeEtc] = useState("");
  const [featEtc, setFeatEtc] = useState("");

  const emit = (next = {}) => {
    onChange?.({
      tableNo,
      capacity,
      types: Array.from(selTypes),
      features: Array.from(selFeats),
      etcInputs: { typeEtc, featureEtc: featEtc },
      ...next,
    });
  };

  const toggleSet = (set, value) => {
    const n = new Set(set);
    n.has(value) ? n.delete(value) : n.add(value);
    return n;
  };

  const onPickCapacity = (v) => {
    setCapacity(v);
    emit({ capacity: v });
  };
  const onToggleType = (v) => {
    const n = toggleSet(selTypes, v);
    setSelTypes(n);
    emit({ types: Array.from(n) });
  };
  const onToggleFeat = (v) => {
    const n = toggleSet(selFeats, v);
    setSelFeats(n);
    emit({ features: Array.from(n) });
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
        <div className="ss-options" role="group" aria-label="형태">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              className={`ss-opt ${selTypes.has(t) ? "is-active" : ""}`}
              onClick={() => onToggleType(t)}
              disabled={disabled}
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
            emit({
              etcInputs: { typeEtc: e.target.value, featureEtc: featEtc },
            });
          }}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
