import React from "react";
import { useNavigate } from "react-router-dom";
import "./CafeLanding.css";

const CafeLanding = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/cafe-signin");
  };

  const handleRegisterClick = () => {
    navigate("/cafe-register-1");
  };

  return (
    <div className="cafe-landing">
      <div className="cafe-landing-container">
        {/* 상단 헤더 */}
        <header className="cafe-landing-header">
          <div className="cafe-header-buttons">
            <button
              className="cafe-header-btn signin-btn"
              onClick={handleSignInClick}
            >
              로그인
            </button>
            <button
              className="cafe-header-btn register-btn"
              onClick={handleRegisterClick}
            >
              업체 등록하기
            </button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="landing-main">
          <div className="logo-area">
            <h1 className="main-logo">BEAN</h1>
            <img src="/logo.png" alt="Bean Logo" className="bean-logo" />
          </div>

          <div className="cafe-image-container">
            <img
              src="/default_landing.png"
              alt="Cafe Interior"
              className="cafe-interior-image"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CafeLanding;
