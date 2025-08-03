import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeLanding.css';

const CafeLanding = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/cafe-signin');
  };

  const handleRegisterClick = () => {
    navigate('/cafe-register-1');
  };

  return (
    <div className="cafe-landing">
      <div className="cafe-landing-container">
        <header className="cafe-header">
          <div className="logo">Bean</div>
          <nav className="nav-menu">
            <button className="nav-btn">서비스 소개</button>
            <button className="nav-btn">가격 안내</button>
            <button className="nav-btn">고객 지원</button>
          </nav>
        </header>

        <main className="cafe-main">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                카페 운영을 위한<br />
                <span className="highlight">올인원 솔루션</span>
              </h1>
              <p className="hero-description">
                주문 관리부터 재고 관리, 고객 분석까지.<br />
                Bean으로 카페 운영을 더욱 스마트하게 만들어보세요.
              </p>
              
              <div className="hero-buttons">
                <button 
                  className="signin-btn primary-btn"
                  onClick={handleSignInClick}
                >
                  로그인
                </button>
                <button 
                  className="register-btn secondary-btn"
                  onClick={handleRegisterClick}
                >
                  업체 등록하기
                </button>
              </div>
            </div>
            
            <div className="hero-image">
              <div className="mockup-container">
                <div className="mockup-screen">
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="app-logo">☕</div>
                      <div className="app-title">Bean Cafe</div>
                    </div>
                    <div className="app-menu">
                      <div className="menu-item">아메리카노</div>
                      <div className="menu-item">카페라떼</div>
                      <div className="menu-item">카푸치노</div>
                      <div className="menu-item">에스프레소</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="features-section">
            <h2 className="features-title">왜 Bean을 선택해야 할까요?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h3>간편한 주문 관리</h3>
                <p>모바일 앱으로 쉽고 빠른 주문 처리</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>실시간 매출 분석</h3>
                <p>매출과 고객 데이터를 실시간으로 확인</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📦</div>
                <h3>스마트 재고 관리</h3>
                <p>자동 재고 알림과 효율적인 관리</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>고객 관계 관리</h3>
                <p>고객 정보와 선호도를 체계적으로 관리</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>지금 바로 시작하세요</h2>
            <p>무료 체험으로 Bean의 모든 기능을 경험해보세요</p>
            <button 
              className="cta-btn primary-btn"
              onClick={handleRegisterClick}
            >
              무료로 시작하기
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CafeLanding; 