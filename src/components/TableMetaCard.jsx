import React, { useMemo, useState } from "react";
import "./SeatStartCard.css"; // 기존 CSS 재사용 + 아래 추가 CSS 몇 줄 필요

/**
 * TableMetaCard
 * - 테이블별 인원수(단일 선택), 형태/기능(다중 선택), 기타 입력을 관리하는 카드 컴포넌트
 * - props:
 *   tableNo: 테이블 번호
 *   capacityOptions: 인원수 옵션 배열
 *   typeOptions: 형태 옵션 배열
 *   featureOptions: 기능 옵션 배열
 *   defaultCapacity: 기본 인원수
 *   defaultTypes: 기본 형태 배열
 *   defaultFeatures: 기본 기능 배열
 *   onChange: 변경 시 콜백(payload)
 *   disabled: 비활성화 여부
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
  // 옵션값 useMemo로 캐싱
  const caps = useMemo(() => capacityOptions ?? ["1인", "2인", "4인", "6인 이상"], [capacityOptions]);
  const types = useMemo(() => typeOptions ?? [
    "기본(사각) 테이블",
    "원형 테이블",
    "바 테이블 / 닷지석",
    "반원/코너 테이블",
    "커뮤니티(공유형) 자리",
    "쇼파 자리",
  ], [typeOptions]);
  const feats = useMemo(() => featureOptions ?? ["콘센트 자리", "창가 자리", "야외(테라스)"], [featureOptions]);

  // 상태 관리
  const [capacity, setCapacity] = useState(defaultCapacity ?? caps[0]); // 선택된 인원수
  const [selTypes, setSelTypes] = useState(new Set(defaultTypes ?? [])); // 선택된 형태
  const [selFeats, setSelFeats] = useState(new Set(defaultFeatures ?? [])); // 선택된 기능
  const [typeEtc, setTypeEtc] = useState(""); // 기타 형태 입력
  const [featEtc, setFeatEtc] = useState(""); // 기타 기능 입력

  // 변경사항을 부모로 전달
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

  // Set 토글 유틸 (다중 선택)
  const toggleSet = (set, value) => {
    const n = new Set(set);
    n.has(value) ? n.delete(value) : n.add(value);
    return n;
  };

  // 인원수 선택 핸들러
  const onPickCapacity = (v) => {
    setCapacity(v);
    emit({ capacity: v });
  };
  // 형태 선택 핸들러
  const onToggleType = (v) => {
    const n = toggleSet(selTypes, v);
    setSelTypes(n);
    emit({ types: Array.from(n) });
  };
  // 기능 선택 핸들러
  const onToggleFeat = (v) => {
    const n = toggleSet(selFeats, v);
    setSelFeats(n);
    emit({ features: Array.from(n) });
  };

  // 카드 UI 렌더링
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

      {/* 인원수 선택 영역 */}
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

      {/* 형태 선택 영역 */}
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
        {/* 기타 형태 직접입력 */}
        <input
          type="text"
          className="ss-input"
          placeholder="기타 (직접입력)"
          value={typeEtc}
          onChange={(e) => {
            setTypeEtc(e.target.value);
            emit({ etcInputs: { typeEtc: e.target.value, featureEtc: featEtc } });
          }}
          disabled={disabled}
        />
      </div>

      {/* 기능 선택 영역 */}
      <div className="ss-section">
        <div className="ss-label">기능</div>
        <div className="ss-options" role="group" aria-label="기능">
          {feats.map((f) => (
            <button
              key={f}
              type="button"
              className={`ss-opt ${selFeats.has(f) ? "is-active" : ""}`}
              onClick={() => onToggleFeat(f)}
              disabled={disabled}
            >
              {f}
            </button>
          ))}
        </div>
        {/* 기타 기능 직접입력 */}
        <input
          type="text"
          className="ss-input"
          placeholder="기타 (직접입력)"
          value={featEtc}
          onChange={(e) => {
            setFeatEtc(e.target.value);
            emit({ etcInputs: { typeEtc, featureEtc: e.target.value } });
          }}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
