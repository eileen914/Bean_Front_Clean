import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeMapCreating.css";

const CafeMapCreating = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/cafe-map-created");
    }, 5000); // 일단은 일정 시간 지나고 화면 전환되게 해놨음

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  return (
    <main className="creating-page" role="main" aria-busy="true">
      {/* 고정 헤더 */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>

      <section className="creating-center">
        <div
          className="creating-spinner"
          aria-label="빈자리 배치도를 생성 중입니다"
        />
        <h1 className="creating-heading">
          우리 가게의 <strong>빈자리 배치도</strong>가<br />
          생성되고 있어요
        </h1>
        {
          <p className="creating-sub">
            점주님이 올린 사진을 분석해 좌석 배치를 자동으로 만들고 있어요.
          </p>
        }
      </section>
    </main>
  );
};

export default CafeMapCreating;
