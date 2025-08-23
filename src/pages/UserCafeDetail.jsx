/**
 * UserCafeDetail 페이지
 * - props: location.state로 전달받는 cafeId, ownerId, cafeName, cafeAddress, cafeImages
 * - 카페 정보, 지도, 좌석 현황, 탭, 이미지 슬라이더, 바텀시트 UI
 */
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserCafeDetail.css";
import testdraft from "../assets/test_draft.png";
import locationIcon from "../assets/ion_detail.svg";
import clockIcon from "../assets/mdi_clock_detail.svg";
import starRating from "../assets/star_rating.svg";
import coffeeIcon from "../assets/material-symbols-light_coffee.svg";
import arrowIcon from "../assets/ep_arrow-up.svg";
import menuVector from "../assets/menu-vector.svg";
import ZoomPanUser from "../components/ZoomPanUser";
import TakenSeat from "../components/TakenSeat"; // 점유된 자리
import UntakenSeat from "../components/UntakenSeat"; // 점유되지 않은 자리
import RatingTag from "../components/RatingTag/RatingTag";
import DetailMap from "../components/DetailMap";
import { listCafeFloorPlans } from "../apis/api";
import TableDetection from "../components/TableDetection";
import ChairDetection from "../components/ChairDetection";
import { useBBoxFromItems, scaleItems } from "../utils/function";

const TARGET_H = 360;

const UserCafeDetail = () => {
  // 라우터에서 카페 정보 props 받기
  const location = useLocation();
  const {
    cafeId = "1",
    ownerId = "1",
    cafeName = "마인드멜드",
    cafeAddress = "서울 관악구 관악로13길 20",
    cafeImages = [],
  } = location.state || {};

  // ===== 탭 및 좌석 상태 =====
  const [activeTab, setActiveTab] = useState("home"); // 현재 선택된 탭
  const [showUnTaken, setShowUnTaken] = useState(false); // 좌석 오버레이 표시 여부
  const [showTaken, setShowTaken] = useState(false); // 좌석 오버레이 표시 여부
  const toggleTaken = () => setShowTaken((v) => !v); // 좌석 오버레이 토글
  const toggleUnTaken = () => setShowUnTaken((v) => !v); // 좌석 오버레이 토글

  const [floorPlan, setFloorPlan] = useState(null);
  const [floorPlanId, setFloorPlanId] = useState(null);
  const [chairs, setChairs] = useState([]); // 의자 목록
  const [tables, setTables] = useState([]); // 테이블 목록
  const [isSet, setIsSet] = useState(false); // 좌석 배치

  const [selectedTaken, setSelectedTaken] = useState(false);
  const [selectedUnTaken, setSelectedUnTaken] = useState(false);
  const [selectedChairIdx, setSelectedChairIdx] = useState(null); // 선택된 의자 인덱스

  const [chair, setChair] = useState(null);

  // 선택 핸들러: 이미 선택된 의자면 해제, 아니면 선택
  const handleSelectChair = (idx, chair) => {
    console.log("handleSelectChair: ", idx, chair);
    setSelectedChairIdx((prev) => (prev === idx ? null : idx));
  };

  const handleChairClick = (idx, chair) => {
    console.log("handleChairClick: ", idx, chair);
    setChair(chair);
    if (chair.occupied) {
      setSelectedTaken(true);
      setShowUnTaken(false);
      setShowTaken(true);
    } else {
      setSelectedUnTaken(true);
      setShowTaken(false);
      setShowUnTaken(true);
    }
  };

  const handleSeatClick = () => {
    setChair(null);
    if (selectedTaken) {
      setShowTaken(false);
      setSelectedTaken(false);
    }

    if (selectedUnTaken) {
      setShowUnTaken(false);
      setSelectedUnTaken(false);
    }
  };

  // 모바일 주소창/뷰포트 대응 (바텀시트 위치 보정)
  useEffect(() => {
    const applyBottomOffset = () => {
      const h = window.visualViewport?.height || window.innerHeight; // 주소창 높이 반영
      const bottom = Math.max(0, Math.round(h - 844));
      document.documentElement.style.setProperty(
        "--sheet-bottom",
        `${bottom}px`
      );
    };

    applyBottomOffset();
    // 뷰포트 변할 때마다 갱신 (모바일 주소창/회전 등)
    window.addEventListener("resize", applyBottomOffset);
    window.visualViewport?.addEventListener("resize", applyBottomOffset);
    window.visualViewport?.addEventListener("scroll", applyBottomOffset);

    return () => {
      window.removeEventListener("resize", applyBottomOffset);
      window.visualViewport?.removeEventListener("resize", applyBottomOffset);
      window.visualViewport?.removeEventListener("scroll", applyBottomOffset);
    };
  }, []);

  useEffect(() => {
    const fetchFloorPlans = async () => {
      if (!cafeId) return; // cafeId가 없으면 실행하지 않음
      const result = await listCafeFloorPlans(cafeId);
      setFloorPlan(result[0]);
      setFloorPlanId(result[0]?.id || null);
    };

    fetchFloorPlans();
  }, [cafeId]);

  useEffect(() => {
    if (!floorPlan) return; // floorPlan이 없으면 실행하지 않음
    setChairs(floorPlan.chairs || []);
    setTables(floorPlan.tables || []);
    setIsSet(true);
  }, [floorPlan]);

  useEffect(() => {
    console.log("chairs updated:", chairs);
    console.log("tables updated:", tables);
    console.log("isSet:", isSet);
    console.log("floorPlan:", floorPlan);
    console.log("scaledChairs:", scaledChairs);
    console.log("scaledTables:", scaledTables);
  }, [isSet]);

  useEffect(() => {
    if (!chair) return;
    console.log("chair updated:", chair);
  }, [chair]);

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

  // 탭 및 네비게이션 관련
  const tabs = ["home", "seating", "menu", "review"];
  const activeIndex = Math.max(0, tabs.indexOf(activeTab));
  const navigate = useNavigate();
  const handleDetail = () => navigate(-1);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "home") setShowTaken(false);
  };

  // 홈 탭 렌더링
  const renderHomeTab = () => (
    <div className="user-cafe-detail-home-tab">
      {/* 카페 정보 */}
      <div className="user-cafe-info">
        <div className="info-header">
          <div className="user-cafe-tags">
            <RatingTag />
            <div className="rating">
              <img src={starRating} className="star-icon" />
              <span>4.9(1,067)</span>
            </div>
          </div>
          <div className="review-link">전체 리뷰 1,503개 &gt;</div>
        </div>
        <div className="info-details">
          <div className="user-detail-item">
            <img src={locationIcon} alt="위치" className="location-icon" />
            <div className="user-detail-text">
              <span className="address">{cafeAddress}</span>
            </div>
          </div>
          <div className="user-detail-item">
            <img src={clockIcon} alt="시간" className="clock-icon" />
            <div className="user-detail-text">
              <span className="status-closed">영업종료</span>
              <span className="open-hours">오늘(월) 12:00 ~ 18:00</span>
            </div>
          </div>
          <div className="user-detail-item">
            <img src={coffeeIcon} alt="커피" className="coffee-icon" />
            <div className="user-detail-text">
              <span>아메리카노 4,500원</span>
            </div>
          </div>
        </div>
        <div className="user-cafe-tags">
          <span className="user-tag">카공맛집</span>
          <span className="user-tag">에그타르트</span>
          <span className="user-tag">수제쿠키</span>
          <span className="user-tag">주차 가능</span>
        </div>
      </div>
      {/* 매장 위치 */}
      <div className="location-section">
        <h3>매장 위치</h3>
        <div className="map-container">
          <DetailMap className="map-image" cafeAddress={cafeAddress} />
        </div>
      </div>
    </div>
  );

  // 좌석 현황 탭 렌더링
  const renderSeatingTab = () => (
    <div className="seating-tab">
      <div className="seating-info">
        <div className="seating-header">
          <div className="seating-count">
            <span> 빈자리: </span>
            <span className="available-count">2</span>
            <span>/</span>
            <span className="total-count">10</span>
          </div>
        </div>
        <div className="seating-description">
          좌석을 클릭하면
          <br />
          예약가능 여부 및 자리 정보를 확인하실 수 있습니다.
        </div>

        {isSet ? (
          <div
            className="canvas-box-2"
            role="region"
            aria-label="좌석 배치도 영역"
          >
            <div
              className="seat-stage"
              style={{ width: stageW, height: stageH }}
            >
              {/*<ZoomPan min={0.5} max={4} step={0.2}> */}
              {scaledChairs.map((chair, idx) => (
                <div onClick={() => handleChairClick(idx, chair)}>
                  <ChairDetection
                    key={idx}
                    width={chair.width - 8}
                    height={chair.height - 8}
                    x_position={chair.x_position}
                    y_position={chair.y_position}
                    window={chair.window}
                    socket={chair.socket}
                    occupied={chair.occupied}
                    floorplan_id={floorPlan.id}
                    chair_idx={idx}
                  />
                </div>
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
                  floorplan_id={floorPlan.id}
                  table_idx={idx}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <div className="seating-legend">
        <div className="seating-text-wrapper">좌석 현황:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <div className="seating-text-wrapper2">빈자리</div>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <div className="seating-text-wrapper2">이용중</div>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <div className="seating-text-wrapper2">선택 자리</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cafe-detail-container">
      {/* 헤더 영역 */}
      <div className="user-cafe-detail-header">
        <div className="user-header-left">
          <div className="user-back-button">
            <img
              src={arrowIcon}
              alt="뒤로가기"
              className="user-arrow-icon"
              onClick={handleDetail}
            />
          </div>
          <div className="user-cafe-title">
            <div className="user-cafe-text-wrapper">{cafeName}</div>
          </div>
        </div>
        <div className="user-cafe-detail-menu-button">
          <img src={menuVector} alt="메뉴탭" />
        </div>
      </div>

      {/* 네비게이션 탭 영역 */}
      <div className="user-cafe-detail-nav-tabs">
        <button
          className={`detail-nav-tab ${activeTab === "home" ? "active" : ""}`}
          onClick={() => handleTabChange("home")}
        >
          홈
        </button>
        <button
          className={`detail-nav-tab ${
            activeTab === "seating" ? "active" : ""
          }`}
          onClick={() => handleTabChange("seating")}
        >
          좌석 현황
        </button>
        <button
          className="detail-nav-tab"
          onClick={() => handleTabChange("menu")}
        >
          메뉴
        </button>
        <button
          className="detail-nav-tab"
          onClick={() => handleTabChange("review")}
        >
          리뷰 1,503
        </button>

        <span
          className="tab-underline"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      </div>

      {/* 이미지 슬라이더 영역 */}
      {activeTab === "home" && (
        <div className="image-slider">
          <div className="slider-placeholder">
            {cafeImages && cafeImages[0] ? (
              <img
                className="image-rectangle"
                src={cafeImages[0]}
                alt="카페 이미지1"
              />
            ) : (
              <span>이미지 슬라이더</span>
            )}
          </div>
        </div>
      )}

      {/* 탭 콘텐츠 영역 */}
      <div className="tab-content">
        {activeTab === "home" ? renderHomeTab() : renderSeatingTab()}
      </div>
      {/* 바텀시트(좌석 오버레이) 영역 */}
      <div
        className={`inline-sheet ${showTaken ? "open" : ""}`}
        onClick={handleSeatClick}
      >
        <TakenSeat chair={chair} floorPlanId={floorPlanId} />
      </div>
      <div
        className={`inline-sheet2 ${showUnTaken ? "open" : ""}`}
        onClick={handleSeatClick}
      >
        <UntakenSeat chair={chair} floorPlanId={floorPlanId} />
      </div>
    </div>
  );
};

export default UserCafeDetail;
