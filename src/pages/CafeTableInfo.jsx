// 카페 테이블 정보 수정 페이지
// - 헤더, 로그아웃, 메뉴, 테이블 정보, 좌석 배치도 등 UI 구성

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";
import ChairDetection from "../components/ChairDetection";
import TableDetection from "../components/TableDetection";
import TableMetaCard from "../components/TableMetaCard";
import SeatMetaCard from "../components/SeatMetaCard";
import { useBBoxFromItems, scaleItems } from "../utils/function";
import { signOut, listCafeFloorPlans } from "../apis/api";

const TARGET_H = 630;

const CafeHomeBeanUpdate = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();
  const location = useLocation();
  const { cafeId, floorPlanId } = location.state || {};

  const [floorPlan, setFloorPlan] = useState(null);
  const [chairs, setChairs] = useState([]);
  const [tables, setTables] = useState([]);
  const [isSet, setIsSet] = useState(false);

  const [seatNumber, setSeatNumber] = useState(0);
  const [emptySeatNumber, setEmptySeatNumber] = useState(0);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      if (!cafeId) return; // cafeId가 없으면 실행하지 않음
      console.log("Fetching floor plans for cafeId:", cafeId);
      const result = await listCafeFloorPlans(cafeId);
      setFloorPlan(result[0]);
    };

    fetchFloorPlans();
  }, [cafeId]);

  useEffect(() => {
    if (!floorPlan) return; // floorPlan이 없으면 실행하지 않음
    console.log("도면들", floorPlan);
    console.log("테이블들", floorPlan.tables);
    setChairs(floorPlan.chairs || []);
    setSeatNumber(floorPlan.chairs.length);
    setEmptySeatNumber(floorPlan.chairs.length);
    setTables(floorPlan.tables || []);
    setIsSet(true);
  }, [floorPlan]);

  useEffect(() => {
    if (!isSet) return; // isSet이 false이면 실행하지 않음
    // 여기에 필요한 로직 추가
    console.log("의자들", chairs);
    console.log("테이블들", tables);
  }, [isSet]);

  // ===== 메뉴 드롭다운 상태 =====
  const [menuOpen, setMenuOpen] = useState(false);

  // 헤더 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => navigate("/cafe-landing");
  // 메뉴 버튼 클릭 시 드롭다운 열기/닫기
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  // 드롭다운 메뉴에서 페이지 이동
  const handleGoto = (path) =>
    navigate(path, { state: { cafeId, floorPlanId } });
  // 업로드 화면 돌아가기
  const handleUploadClick = () => navigate("/cafe-upload");
  // 로그아웃 버튼 클릭 시 로그아웃 후 홈으로 이동
  const handleLogoutClick = async () => {
    try {
      const result = await signOut();
      console.log("로그아웃 결과:", result);
    } finally {
      navigate("/cafe-landing", { replace: true });
    }
  };

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

  // 테이블 선택 상태 및 핸들러
  const [selectedTableIdx, setSelectedTableIdx] = useState(null);
  const handleSelectTable = (idx) => {
    setSelectedTableIdx((prev) => (prev === idx ? null : idx));
    setSelectedChairIdx(null); // 테이블 선택 시 의자 선택 해제
  };
  // 의자 선택 상태 및 핸들러
  const [selectedChairIdx, setSelectedChairIdx] = useState(null);
  const handleSelectChair = (idx) => {
    setSelectedChairIdx((prev) => (prev === idx ? null : idx));
    setSelectedTableIdx(null); // 의자 선택 시 테이블 선택 해제
  };

  const handleSeatMetaChange = () => {
    setSelectedChairIdx(null);
  };

  const handleTableMetaChange = () => {
    setSelectedTableIdx(null);
  };

  return (
    <main className="bean-update" role="main">
      {/* ===== 헤더 영역 ===== */}
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
            {/* 로그아웃 버튼 */}
            <button className="logout-btn" onClick={handleLogoutClick}>
              로그아웃
            </button>

            {/* 메뉴 드롭다운 */}
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

      {/* ===== 본문 영역 ===== */}
      <section className="page-container">
        {/* 테이블 정보 및 안내 */}
        <h2 className="page-title">테이블 정보 수정하기</h2>
        <p className="page-sub">
          테이블별로 자리 정보를 설정할 수 있습니다.
          <br />
          설정된 테이블 정보는 고객 앱에서도 확인 가능합니다.
        </p>

        {isSet ? (
          <>
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
                    onSelect={() => handleSelectChair(idx)}
                  />
                ))}
                {scaledTables.map((table, idx) => (
                  <TableDetection
                    width={table.width - 5}
                    height={table.height - 5}
                    x_position={table.x_position}
                    y_position={table.y_position}
                    shape={table.shape}
                    seat_number={table.seat_number}
                    floorplan_id={floorPlanId}
                    table_idx={idx}
                    selected={selectedTableIdx === idx}
                    onClick={() => handleSelectTable(idx)}
                  />
                ))}
                {/*</ZoomPan> */}
                {selectedTableIdx !== null &&
                  (() => {
                    const table = scaledTables[selectedTableIdx];
                    if (!table) return null;
                    const cardWidth = 380;
                    const cardHeight = 593;
                    const margin = 20;
                    const tableCenterX = table.x_position;
                    const tableCenterY = table.y_position;
                    const tableW = table.width - 5;
                    const tableH = table.height - 5;
                    let left = tableCenterX + tableW / 2 + 30;
                    let top = tableCenterY - cardHeight / 2 + tableH / 2;
                    // 오른쪽 경계 보정
                    if (left + cardWidth > stageW - margin) {
                      left = tableCenterX - tableW / 2 - cardWidth - 50;
                      if (left < margin) left = margin;
                    }
                    // 왼쪽 경계 보정
                    if (left < margin) {
                      left = margin;
                    }

                    // 상단 경계 보정 (최소 20px)
                    if (top < margin) {
                      top = margin;
                    }
                    // 하단 경계 보정 (최소 20px)
                    if (top + cardHeight > stageH - margin) {
                      top = stageH - cardHeight - margin;
                    }
                    return (
                      <div
                        style={{
                          position: "absolute",
                          left: left,
                          top: top,
                          zIndex: 1000,
                        }}
                      >
                        <TableMetaCard
                          tableNo={`${selectedTableIdx + 1}`}
                          tableId={table.id}
                          onSaved={handleTableMetaChange}
                        />
                      </div>
                    );
                  })()}

                {selectedChairIdx !== null &&
                  (() => {
                    const chair = scaledChairs[selectedChairIdx];
                    if (!chair) return null;
                    const cardWidth = 380;
                    const cardHeight = 280;
                    const margin = 20;
                    const bottomMargin = 50;
                    const chairCenterX = chair.x_position;
                    const chairCenterY = chair.y_position;
                    const chairW = chair.width - 8;
                    const chairH = chair.height - 8;
                    let left = chairCenterX + chairW / 2 + 30;
                    let top = chairCenterY - cardHeight / 2 + chairH / 2;
                    // 오른쪽 경계 보정
                    if (left + cardWidth > stageW - margin) {
                      left = chairCenterX - chairW / 2 - cardWidth - 50;
                      if (left < margin) left = margin;
                    }
                    // 왼쪽 경계 보정
                    if (left < margin) left = margin;
                    // 상단 경계 보정 (최소 20px)
                    if (top < margin) top = margin;
                    // 하단 경계 보정 (최소 40px)
                    if (top + cardHeight > stageH - bottomMargin) {
                      top = stageH - cardHeight - bottomMargin;
                    }
                    return (
                      <div
                        style={{
                          position: "absolute",
                          left: left,
                          top: top,
                          zIndex: 1000,
                        }}
                      >
                        <SeatMetaCard
                          seatNo={`${floorPlanId}-${selectedChairIdx + 1}`}
                          chairId={chair.id}
                          onSaved={handleSeatMetaChange}
                        />
                      </div>
                    );
                  })()}
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
