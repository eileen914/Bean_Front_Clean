import React, { useEffect, useMemo, useState } from "react";
import "./SeatStartCard.css";
import { updateChair, listChairs, getChair } from "../apis/api";

/**
 * SeatStartCard
 * -----------------------------------------
 * @param {number|string} floorPlanId
 * @param {number}        index
 * @param {string|number} tableNo         - (선택) 표시에 쓸 좌석번호. 미지정 시 `${floorPlanId}-${index}` 자동 생성
 * @param {Date}          now             - 기본: new Date()
 * @param {number[]}      options         - 기본: [90,120,180]
 * @param {number|null}   defaultMinutes  - 기본: options[0]
 * @param {boolean}       disabled
 * @param {function}      onStart         - 성공 시 콜백 ({ tableNo, minutes, checkinAt, expectedOutAt, response })
 * @param {function}      onChangeMinutes
 * -----------------------------------------
 */
export default function SeatStartCard({
  floorPlanId,
  index,
  id,
  tableNo,
  now,
  options = [90, 120, 180],
  defaultMinutes,
  disabled = false,
  onStart,
  onChangeMinutes,
}) {
  const _now = useMemo(() => now ?? new Date(), [now]);
  const displayNo = useMemo(
    () => (tableNo != null ? tableNo : `${floorPlanId}-${index}`),
    [tableNo, floorPlanId, index]
  );

  const [minutes, setMinutes] = useState(
    defaultMinutes ?? (options && options.length ? options[0] : 90)
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [chairId, setChairId] = useState(id);
  const [existingChair, setExistingChair] = useState(null);
  const [resolving, setResolving] = useState(true);

  // 1) floorPlanId + index -> chairId 해석 (백엔드 수정 없이 listChairs로 해결)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setResolving(true);
        setError("");

        const target = await getChair(chairId); // [{ id, floor_plan, ... }, ...]
        console.log("resolve chair", target);

        if (!target) {
          throw {
            status: 404,
            message: `해당 좌석을 찾을 수 없습니다. (floorPlanId=${floorPlanId}, index=${index})`,
          };
        }

        if (mounted) {
          setExistingChair(target);
        }
      } catch (e) {
        console.error("[resolve chair error]", e);
        if (mounted) {
          setError(`좌석 해석 오류 (${e?.status || 0}) ${e?.message || ""}`);
        }
      } finally {
        if (mounted) setResolving(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [floorPlanId, index]);

  const fmtHHMM = (d) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;

  const handlePick = (m) => {
    setMinutes(m);
    onChangeMinutes?.(m);
  };

  // 2) 착석 처리
  const handleStart = async () => {
    if (!chairId) {
      setError("chairId를 해석하지 못했습니다.");
      return;
    }
    setSaving(true);
    setError("");

    const checkinAt = _now;
    const expectedOutAt = new Date(checkinAt.getTime() + minutes * 60_000);

    const payload = {
      occupied: true,
      entry_time: checkinAt.toISOString(),
    };

    try {
      const { status, data } = await updateChair(chairId, payload);
      if (status !== 200) throw { status, data, message: "Unexpected status" };
      else console.log("좌석 착석 처리 성공", data);

      onStart?.({
        tableNo: displayNo,
        minutes,
        checkinAt,
        expectedOutAt,
        response: data,
        chairId: chairId,
      });
    } catch (e) {
      console.error("[seat start error]", e);
      const detail =
        typeof e?.data === "object" ? JSON.stringify(e.data) : e?.data || "";
      setError(
        `착석 처리 오류 (${e?.status || 0}) ${e?.message || ""} ${detail}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      className={`ss-card ${disabled ? "is-disabled" : ""}`}
      role="group"
      aria-label={`${displayNo}번 좌석 착석 설정`}
    >
      <header className="ss-header">
        <h3 className="ss-title">
          <strong>{displayNo}</strong> 번 좌석
        </h3>
        <div className="ss-now">
          <span className="ss-key">현재시간</span>
          <span className="ss-sep">|</span>
          <time className="ss-val" dateTime={_now.toISOString()}>
            {fmtHHMM(_now)}
          </time>
        </div>
      </header>

      <div className="ss-section">
        <div className="ss-label">
          사용시간 설정하기 <span className="ss-hint">(선택)</span>
        </div>
        <div
          className="ss-options"
          role="radiogroup"
          aria-label="사용시간 선택"
        >
          {options.map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={minutes === m}
              className={`ss-opt ${minutes === m ? "is-active" : ""}`}
              onClick={() => handlePick(m)}
              disabled={disabled || saving || resolving}
            >
              {m}분
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ color: "#d33", fontSize: "0.85rem", marginBottom: 8 }}>
          {error}
        </div>
      )}

      <div className="ss-actions">
        <button
          className="ss-btn"
          type="button"
          onClick={handleStart}
          disabled={disabled || saving || resolving}
        >
          {saving
            ? "처리 중..."
            : resolving
            ? "좌석 찾는 중..."
            : "착석 처리하기"}
        </button>
      </div>
    </section>
  );
}
