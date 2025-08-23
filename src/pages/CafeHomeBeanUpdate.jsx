import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";
import whitecursor from "../assets/white-cursor.svg";
import testDraft from "../assets/test_draft.png";
import ZoomPan from "../components/ZoomPan";
import { getCookie, removeCookie } from "../utils/cookie";
import { signOut, listCafeFloorPlans } from "../apis/api";
import ChairDetection from "../components/ChairDetection";
import { use } from "react";
const CafeHomeBeanUpdate = () => {
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      console.log("로그아웃 결과:", result);
    } finally {
      navigate("/cafe-landing", { replace: true });
    }
  };
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { cafeId, floorPlanId } = location.state || {};
  const [floorPlan, setFloorPlan] = useState(null);
  const [chairs, setChairs] = useState([]);
  const [tables, setTables] = useState([]);
  const [isSet, setIsSet] = useState(false);
  const handleLogoClick = () => navigate("/cafe-landing");
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  const handleGoto = (path) => navigate(path);
  const handleLogoutClick = () => {};
  const [seatMapImage] = useState(null);
  const handleUploadClick = () => navigate("/cafe-upload");
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
    setChairs(floorPlan.chairs || []);
    setTables(floorPlan.tables || []);
    setIsSet(true);
  }, [floorPlan]);
  const testDraft = null; // testDraft를 사용하지 않으므로 null로 설정
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
                전체 좌석 수: <b>0</b> / 현재 빈 자리: <b>0</b>
              </div>
              <div className="meta-right status-live">* 현재 사용중</div>
            </div>
            <div
              className="canvas-box"
              role="region"
              aria-label="좌석 배치도 영역"
            >
              {/*<ZoomPan min={0.5} max={4} step={0.2}> */}
              {chairs.map((chair, idx) => (
                <ChairDetection
                  width={chair.width}
                  height={chair.height}
                  x_position={chair.x_position}
                  y_position={chair.y_position}
                  window={chair.window}
                  socket={chair.socket}
                  occupied={chair.occupied}
                  floorplan_id={floorPlanId}
                  chair_idx={idx}
                />
              ))}
              {/*</ZoomPan> */}
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