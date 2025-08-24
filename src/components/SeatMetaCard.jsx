import { useMemo, useState } from "react";
import "./SeatMetaCard.css";
import { updateChair } from "../apis/api";

/**
 * SeatMetaCard
 * - 기능(다중 선택) + 기타 입력 + 저장 버튼
 *
 * Props
 * - chairId: string|number
 * - seatNo: string|number
 * - featureOptions?: string[]      // 기본: ["콘센트 자리","창가 자리","야외(테라스)"]
 * - defaultFeatures?: string[]
 * - onChange?: (payload) => void   // { seatNo, features, etcInputs:{ featureEtc } }
 * - onSaved?: (data) => void       // 저장 성공 콜백(선택)
 * - disabled?: boolean
 */

export default function SeatMetaCard({
  chairId,
  seatNo,
  featureOptions,
  defaultFeatures,
  onChange,
  onSaved,
  disabled = false,
}) {
  const feats = useMemo(
    () => featureOptions ?? ["콘센트 자리", "창가 자리", "야외(테라스)"],
    [featureOptions]
  );

  const [selFeats, setSelFeats] = useState(new Set(defaultFeatures ?? []));
  const [featEtc, setFeatEtc] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 기타 입력을 features에 합쳐 보내기
  const getEffectiveFeatures = () => {
    const base = Array.from(selFeats);
    return featEtc?.trim() ? [...base, featEtc.trim()] : base;
  };

  const emit = (next = {}) => {
    const features = getEffectiveFeatures();
    onChange?.({
      seatNo,
      features,
      etcInputs: { featureEtc: featEtc },
      ...next,
    });
  };

  const toggleSet = (set, value) => {
    const n = new Set(set);
    n.has(value) ? n.delete(value) : n.add(value);
    return n;
  };

  const onToggleFeat = (v) => {
    const n = toggleSet(selFeats, v);
    setSelFeats(n);
    emit({ features: Array.from(n) });
  };

  const isSelected = (label) => selFeats.has(label);
  const toChairPayload = () => ({
    socket: isSelected("콘센트 자리"),
    window: isSelected("창가 자리"),
    // NOTE: '야외(테라스)'와 기타 입력은 현 모델에 대응 필드가 없어 저장 제외
  });

  const handleSave = async () => {
    if (!chairId) {
      setError("chairId가 없습니다.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = toChairPayload();
      const { status, data } = await updateChair(chairId, payload);

      if (status !== 200) {
        // eslint-disable-next-line no-throw-literal
        throw new Error(`Unexpected status: ${status}, data: ${JSON.stringify(data)}`);
      } else console.log("[seat save] ok", data);
      onSaved?.();
    } catch (e) {
      console.error("[seat save error]", e);
      const detail =
        typeof e?.data === "object" ? JSON.stringify(e.data) : e?.data || "";
      setError(`저장 오류 (${e?.status || 0}) ${e?.message || ""} ${detail}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      className={`sm-card ${disabled ? "is-disabled" : ""}`}
      role="group"
      aria-label={`${seatNo}번 좌석 속성 설정`}
    >
      <header className="sm-header">
        {" "}
        <h3 className="sm-title">
          {" "}
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
              disabled={disabled || saving}
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
            emit({ etcInputs: { featureEtc: e.target.value } });
          }}
          disabled={disabled || saving}
        />
      </div>

      {/* 저장 버튼 & 에러 */}
      <div className="sm-actions">
        {error && (
          <div style={{ color: "#d33", fontSize: "0.85rem", marginBottom: 8 }}>
            {error}
          </div>
        )}
        <button
          className="sm-btn"
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
