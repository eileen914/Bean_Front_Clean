// 카페 좌석 현황 관리 페이지
// - 헤더, 메뉴, 좌석 배치도 업로드/생성 기능 포함

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeHomeBeanUpdate.css";
import MenuDropdown from "../components/MenuDropdown";
import whitecursor from "../assets/white-cursor.svg";
import { getCookie, removeCookie } from "../utils/cookie";
import { signOut } from "../apis/api";

const CafeHomeBeanUpdate = () => {
  // ===== 라우터 및 상태 관리 =====
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ===== 이벤트 핸들러 =====
  // 로그아웃 처리 (API 호출 후 홈으로 이동)
  const handleSignOut = async () => {
    try {
      await signOut();
    } finally {
      navigate("/cafe-landing", { replace: true });
    }
  };
  // 헤더 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => navigate("/cafe-landing");
  // 메뉴 버튼 토글
  const handleMenuToggle = () => setMenuOpen((v) => !v);
  // 드롭다운 메뉴에서 경로 이동
  const handleGoto = (path) => navigate(path);
  // 좌석 배치도 업로드 페이지로 이동
  const handleUploadClick = () => navigate("/cafe-upload");

  return (
    <main className="bean-update" role="main">
      {/* ===== 헤더 영역 ===== */}
      <header className="update-fixed-header">
        <div className="update-header-content">
          {/* 헤더 좌측: 로고 및 홈 이동 */}
          <div className="update-header-left" onClick={handleLogoClick}>
            <img
              src="/logo.png"
              alt="Bean Logo"
              className="update-header-logo"
            />
            <h1 className="update-header-text">Bean</h1>
          </div>

          {/* 헤더 우측: 로그아웃 및 메뉴 */}
          <div className="update-header-right">
            {/* 로그아웃 버튼 */}
            <button className="logout-btn" onClick={handleSignOut}>
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

              {/* 메뉴 드롭다운 컴포넌트: open/onClose/onGoto prop으로 제어 */}
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
        {/* 페이지 제목 및 설명 */}
        <h2 className="page-title">빈자리 관리하기</h2>
        <p className="page-sub">
          좌석별로 사용 현황을 업데이트할 수 있습니다.
          <br />이 화면에서 업데이트되는 빈자리 현황은 고객 앱에도 실시간으로
          반영돼요.
        </p>

        {/* 좌석 배치도 업로드/생성 버튼 영역 */}
        <div className="canvas-box" role="region" aria-label="좌석 배치도 영역">
          <div className="empty-canvas">
            {/* 좌석 배치도 만들기 버튼: 업로드 페이지로 이동 */}
            <button
              className="create-seatmap-btn"
              onClick={handleUploadClick}
            >
              빈자리 배치도 만들기
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CafeHomeBeanUpdate;
