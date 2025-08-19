import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";
import whitecursor from "../assets/white-cursor.svg";
import testDraft from "../assets/test_draft.png";
import ZoomPan from "../components/ZoomPan";

const CafeHomeBeanUpdate = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => navigate("/cafe-landing");
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  const handleGoto = (path) => navigate(path);
  const handleLogoutClick = () => {
    navigate("/cafe-landing");
  };
  const [seatMapImage] = useState(null);
  const handleUploadClick = () => navigate("/cafe-upload");


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
            <button className="logout-btn" onClick={handleLogoutClick}>
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

        <div className="canvas-box" role="region" aria-label="좌석 배치도 영역">
          <button className="create-seatmap-btn" onClick={handleUploadClick}>
            <img src={whitecursor}/> 
            <div>빈자리 배치도 만들기</div>
          </button>
        </div>

      </section>
    </main>
  );
};

export default CafeHomeBeanUpdate;
