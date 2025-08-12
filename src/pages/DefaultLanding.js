import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DefaultLanding.css';

const DefaultLanding = () => {
  const navigate = useNavigate();

  const handleCafeOwnerClick = () => {
    navigate('/cafe-landing');
  };

  const handleCustomerClick = () => {
    // 고객용 페이지로 이동 (현재는 알림만 표시)
    alert('고객용 서비스는 준비 중입니다.');
  };

  return (
    <div className="default-landing">
      <div className="landing-container">
        {/* 상단 헤더 */}
        <header className="landing-header">         
          <div className="header-buttons">
            <button 
              className="header-btn customer-btn"
              onClick={handleCustomerClick}
            >
              카페를 찾는 이용자입니다
            </button>
            <button 
              className="header-btn owner-btn"
              onClick={handleCafeOwnerClick}
            >
              카페를 운영하는 점주입니다
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

export default DefaultLanding; 