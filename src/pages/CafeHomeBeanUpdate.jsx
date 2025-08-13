import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";

const CafeHomeBeanUpdate = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = () => navigate("/cafe-landing");
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  const handleGoto = (path) => navigate(path);

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
            <button className="logout-btn" onClick={() => alert("로그아웃")}>
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
          이 화면에서 업데이트되는 빈자리 현황은 고객 앱에도 실시간으로 반영돼요
        </p>

        <div className="meta-row">
          <div className="meta-left">
            전체 좌석 수: <b>15</b> / 현재 빈 자리: <b>9</b>
          </div>
          <div className="meta-right status-live">* 현재 사용중</div>
        </div>

        <div className="canvas-box" role="region" aria-label="좌석 배치도 영역">
          {/* 좌석 배치도 들어갈 영역 */}
        </div>
      </section>
    </main>
  );
};

export default CafeHomeBeanUpdate;
