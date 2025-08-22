// 빈자리 배치도 생성 중 페이지
// - 일정 시간 후 자동 화면 전환, 헤더, 로딩 스피너, 안내 텍스트 등으로 구성

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeMapCreating.css";

const CafeMapCreating = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // 페이지 진입 후 5초 뒤 자동으로 등록 완료 페이지로 이동
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cafe-map-created");
    }, 5000); // 일정 시간 후 화면 전환
    return () => clearTimeout(timer);
  }, [navigate]);

  // 헤더 로고 클릭 시 랜딩 페이지로 이동
  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  return (
    <main className="creating-page" role="main" aria-busy="true">
      {/* ===== 헤더 영역 ===== */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>

      {/* ===== 메인 콘텐츠 영역 ===== */}
      <section className="creating-center">
        {/* 로딩 스피너 */}
        <div
          className="creating-spinner"
          aria-label="빈자리 배치도를 생성 중입니다"
        />
        {/* 안내 텍스트 */}
        <h1 className="creating-heading">
          우리 가게의 <strong>빈자리 배치도</strong>가<br />
          생성되고 있어요
        </h1>
        <p className="creating-sub">
          점주님이 올린 사진을 분석해 좌석 배치를 자동으로 만들고 있어요.
        </p>
      </section>
    </main>
  );
};

export default CafeMapCreating;
