import React, { useMemo, useState } from "react";
import "./SeatMetaCard.css";
// import "./SeatStartCard.css";

export default function SeatMetaCard({
  seatNo,
  featureOptions,
  defaultFeatures,
  disabled = false,
  onChange,
}) {
  const feats = useMemo(
    () => featureOptions ?? ["콘센트 자리", "창가 자리", "야외(테라스)"],
    [featureOptions]
  );

  const [selFeats, setSelFeats] = useState(new Set(defaultFeatures ?? []));
  const [featEtc, setFeatEtc] = useState("");

  const toggleSet = (set, value) => {
    const n = new Set(set);
    n.has(value) ? n.delete(value) : n.add(value);
    return n;
  };

  const onToggleFeat = (v) => {
    const n = toggleSet(selFeats, v);
    setSelFeats(n);
    onChange?.({
      features: Array.from(n),
      etcInputs: { featureEtc: featEtc },
    });
  };

  return (
    <section
      className={`ss-card ${disabled ? "is-disabled" : ""}`}
      role="group"
      aria-label={`${seatNo}번 좌석 속성 설정`}
    >
      <header className="ss-header">
        <h3 className="ss-title">
          <strong>{seatNo}</strong> 번 좌석
        </h3>
      </header>

      {/* 기능 */}

      <div className="sm-section">
        <div className="sm-label">기능</div>
        <div className="sm-options" role="group" aria-label="기능">
          {feats.map((f) => (
            <button
              key={f}
              type="button"
              className={`sm-opt ${selFeats.has(f) ? "is-active" : ""}`}
              onClick={() => onToggleFeat(f)}
              disabled={disabled}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="sm-input"
          placeholder="기타 (직접입력)"
          value={featEtc}
          onChange={(e) => {
            setFeatEtc(e.target.value);
            onChange?.({
              etcInputs: { featureEtc: e.target.value },
            });
          }}
          disabled={disabled}
        />
      </div>
    </section>
  );
}
