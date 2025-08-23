import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";
import whitecursor from "../assets/white-cursor.svg";
import testDraft from "../assets/test_draft.png";
import ZoomPan from "../components/ZoomPan";
import { getCookie, removeCookie } from "../utils/cookie";
import {
  signOut,
  listCafeFloorPlans,
  getChair,
  updateChair,
} from "../apis/api";
import ChairDetection from "../components/ChairDetection";
import SeatStartCard from "../components/SeatStartCard";
import TableStatusCard from "../components/TableStatusCard";
import TableDetection from "../components/TableDetection";
import { useBBoxFromItems, scaleItems } from "../utils/function";
import { fmtHHMM, fmtDuration } from "../utils/dateTime";

const TARGET_H = 630;

const CafeHomeBeanUpdate = () => {
  // 한 번에 하나만 선택되는 의자 idx 관리
  const [selectedChairIdx, setSelectedChairIdx] = useState(null);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const { cafeId, floorPlanId } = location.state || {};

  const [floorPlan, setFloorPlan] = useState(null);
  const [chairs, setChairs] = useState([]);
  const [tables, setTables] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [seatNumber, setSeatNumber] = useState(0);
  const [emptySeatNumber, setEmptySeatNumber] = useState(0);
  const [occupiedSeat, setOccupiedSeat] = useState(null);

  const handleLogoClick = () => navigate("/cafe-landing");
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  const handleGoto = (path) =>
    navigate(path, { state: { cafeId, floorPlanId } });
  const [seatMapImage] = useState(null);
  const handleUploadClick = () => navigate("/cafe-upload");

  // 선택 핸들러: 이미 선택된 의자면 해제, 아니면 선택
  const handleSelectChair = (idx, chair) => {
    console.log("handleSelectChair: ", idx, chair);
    setSelectedChairIdx((prev) => (prev === idx ? null : idx));
    if (chair.occupied) {
      setOccupiedSeat({
        chairId: chair.id,
        tableNo: `${chair.floor_plan}-${idx + 1}`,
        minutes: 120,
        checkinAt: chair.entry_time,
        expectedOutAt: new Date(
          new Date(chair.entry_time).getTime() + 120 * 60_000
        ), // 2시간 후
      });
    } else {
      setOccupiedSeat(null);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      console.log("로그아웃 결과:", result);
    } finally {
      navigate("/cafe-landing", { replace: true });
    }
  };

  const handleCheckout = async (chairId) => {
    const result = await updateChair(chairId, { occupied: false });
    console.log("퇴실 처리 결과:", result);
    if (result.status === 200) {
      setChairs((prevChairs) =>
        prevChairs.map((chair) =>
          chair.id === chairId ? { ...chair, occupied: false } : chair
        )
      );

      setEmptySeatNumber((prev) => prev + 1);
      setSelectedChairIdx(null);
      setOccupiedSeat(null);
    } else {
      console.error("퇴실 처리 실패:", result);
    }
  };

  const handleStart = (data) => {
    setOccupiedSeat(data);
    setEmptySeatNumber((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchFloorPlans = async () => {
      if (!cafeId) return; // cafeId가 없으면 실행하지 않음
      const result = await listCafeFloorPlans(cafeId);
      setFloorPlan(result[0]);
    };

    fetchFloorPlans();
  }, [cafeId]);

  useEffect(() => {
    if (!floorPlan) return; // floorPlan이 없으면 실행하지 않음
    setChairs(floorPlan.chairs || []);
    setSeatNumber(floorPlan.chairs.length);
    setEmptySeatNumber(floorPlan.chairs.length);
    setTables(floorPlan.tables || []);
    setIsSet(true);
  }, [floorPlan]);

  useEffect(() => {
    const fetchChairs = async () => {
      if (!occupiedSeat) return;
      const result = await getChair(occupiedSeat.chairId);
      if (!result || !result.id) return;

      console.log("갱신된 의자 정보", result);

      setChairs((prevChairs) =>
        prevChairs.map((chair) => {
          if (chair.id === result.id) {
            return { ...chair, occupied: result.occupied };
          }
          return chair;
        })
      );
    };
    fetchChairs();
  }, [occupiedSeat]);

  // 1) 원본 도면의 폭/높이(있으면 그대로, 없으면 의자/테이블에서 추정)
  const bbox = useBBoxFromItems(chairs, tables);
  const originalW = floorPlan?.width ?? bbox.w;
  const originalH = floorPlan?.height ?? bbox.h;

  // 2) "원본 height → 630px"이 되도록 배율 계산
  const scale = useMemo(() => {
    const h = originalH || TARGET_H; // 0/undefined 방어
    return TARGET_H / h; // 확대/축소 모두 허용
  }, [originalH]);

  // 3) 스테이지(도면) 화면상 크기
  const stageW = Math.round(originalW * scale);
  const stageH = TARGET_H; // 정확히 630으로 고정

  // 4) 좌표/크기 값 자체를 스케일링
  const scaledChairs = useMemo(
    () => scaleItems(chairs, scale),
    [chairs, scale]
  );
  const scaledTables = useMemo(
    () => scaleItems(tables, scale),
    [tables, scale]
  );

  return (
    <main className="bean-update" role="main">
      {/* 고정 헤더 */}
      <header className="update-fixed-header">
        <div className="update-header-content">
          <div className="update-header-left" onClick={handleLogoClick}>
            <img
              src="/logo.png"
              alt="Bean Logo"
              className="update-header-logo"
            />
            <h1 className="update-header-text">Bean</h1>
          </div>

          <div className="update-header-right">
            <button className="logout-btn" onClick={handleSignOut}>
              로그아웃
            </button>

            <div className="menu-wrap">
              <button
                className="menu-btn"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={handleMenuToggle}
              >
                <span className="menu-bar" />
                <span className="menu-bar" />
                <span className="menu-bar" />
              </button>

              <MenuDropdown
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                onGoto={handleGoto}
              />
            </div>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <section className="page-container">
        <h2 className="page-title">빈자리 관리하기</h2>
        <p className="page-sub">
          좌석별로 사용 현황을 업데이트할 수 있습니다.
          <br />이 화면에서 업데이트되는 빈자리 현황은 고객 앱에도 실시간으로
          반영돼요.
        </p>
        {isSet ? (
          <>
            <div className="meta-row">
              <div className="meta-left">
                전체 좌석 수: <b>{seatNumber}</b> / 현재 빈 자리:{" "}
                <b>{emptySeatNumber}</b>
              </div>
              <div className="meta-right status-live">* 현재 사용중</div>
            </div>
            <div
              className="canvas-box"
              role="region"
              aria-label="좌석 배치도 영역"
            >
              <div
                className="seat-stage"
                style={{ width: stageW, height: stageH }}
              >
                {/*<ZoomPan min={0.5} max={4} step={0.2}> */}
                {scaledChairs.map((chair, idx) => (
                  <ChairDetection
                    key={idx}
                    width={chair.width - 8}
                    height={chair.height - 8}
                    x_position={chair.x_position}
                    y_position={chair.y_position}
                    window={chair.window}
                    socket={chair.socket}
                    occupied={chair.occupied}
                    floorplan_id={floorPlanId}
                    chair_idx={idx}
                    selected={selectedChairIdx === idx}
                    onSelect={() => handleSelectChair(idx, chair)}
                  />
                ))}
                {scaledTables.map((table, idx) => (
                  <TableDetection
                    key={idx}
                    width={table.width - 5}
                    height={table.height - 5}
                    x_position={table.x_position}
                    y_position={table.y_position}
                    shape={table.shape}
                    seat_number={table.seat_number}
                    floorplan_id={floorPlanId}
                    table_idx={idx}
                  />
                ))}
                {/*</ZoomPan> */}
                  {selectedChairIdx !== null && (
                    (() => {
                      const chair = scaledChairs[selectedChairIdx];
                      if (!chair) return null;
                      const cardWidth = 380;
                      const cardHeight = 280;
                      const chairCenterX = chair.x_position;
                      const chairCenterY = chair.y_position;
                      const chairW = chair.width - 8;
                      const chairH = chair.height - 8;
                      // 기본: chair 오른쪽 50px
                      let left = chairCenterX + chairW / 2 + 30;
                      let top = chairCenterY - cardHeight / 2 + chairH / 2;
                      // 만약 카드가 canvas-box 오른쪽을 벗어나면 chair 왼쪽에 띄움
                      if (left + cardWidth > stageW - 10) {
                        left = chairCenterX - chairW / 2 - cardWidth - 50;
                        if (left < 10) left = 10;
                      }
                      // 상하 경계 보정
                      top = Math.max(top, 20);
                      top = Math.min(top, stageH - cardHeight - 30);
                      return (
                        <div style={{
                          position: 'absolute',
                          left: left,
                          top: top,
                          zIndex: 1000
                        }}>
                          {occupiedSeat === null ? (
                            <SeatStartCard
                              floorPlanId={floorPlanId}
                              index={selectedChairIdx + 1}
                              id={scaledChairs[selectedChairIdx].id}
                              now={new Date()}
                              onStart={handleStart}
                            />
                          ) : (
                            <TableStatusCard
                              tableNo={occupiedSeat.tableNo}
                              elapsedLabel={`${fmtDuration(
                                Date.now() -
                                  new Date(occupiedSeat.checkinAt).getTime()
                              )} 동안 사용중`}
                              checkinTime={fmtHHMM(occupiedSeat.checkinAt)}
                              expectedOutAt={fmtHHMM(occupiedSeat.expectedOutAt)}
                              remainingLabel={`남은 시간: ${fmtDuration(
                                occupiedSeat.expectedOutAt -
                                  new Date(occupiedSeat.checkinAt).getTime()
                              )}`}
                              onCheckout={() => {
                                handleCheckout(occupiedSeat.chairId);
                              }}
                            />
                          )}
                        </div>
                      );
                    })
                  )}
              </div>
            </div>
          </>
        ) : (
          <div
            className="canvas-box"
            role="region"
            aria-label="좌석 배치도 영역"
          >
            <div className="empty-canvas">
              <button
                className="create-seatmap-btn"
                onClick={handleUploadClick}
              >
                빈자리 배치도 만들기
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default CafeHomeBeanUpdate;
