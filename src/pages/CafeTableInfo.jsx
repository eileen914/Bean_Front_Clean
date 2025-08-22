// 카페 테이블 정보 수정 페이지
// - 헤더, 로그아웃, 메뉴, 테이블 정보, 좌석 배치도 등 UI 구성

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";

const CafeHomeBeanUpdate = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // ===== 메뉴 드롭다운 상태 =====
  const [menuOpen, setMenuOpen] = useState(false);

  // 헤더 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => navigate("/cafe-landing");
  // 메뉴 버튼 클릭 시 드롭다운 열기/닫기
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  // 드롭다운 메뉴에서 페이지 이동
  const handleGoto = (path) => navigate(path);
  // 로그아웃 버튼 클릭 시 홈으로 이동
  const handleLogoutClick = () => {
    navigate("/cafe-landing");
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

        {/* 테이블/좌석 메타 정보 */}
        <div className="meta-row">
          <div className="meta-left">
            전체 좌석 수: <b>15</b> / 현재 빈 자리: <b>9</b>
            {/* 실제 서비스에서는 props로 받은 테이블/좌석 정보를 활용 */}
          </div>
          <div className="meta-right status-live">* 현재 사용중</div>
        </div>

        {/* 좌석 배치도 영역 */}
        <div className="canvas-box" role="region" aria-label="좌석 배치도 영역">
          {/* 좌석 배치도 컴포넌트 렌더링 예정 */}
        </div>
      </section>
    </main>
  );
};

export default CafeHomeBeanUpdate;
