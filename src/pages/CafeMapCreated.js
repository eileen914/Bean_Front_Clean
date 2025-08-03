import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeMapCreated.css';

const CafeMapCreated = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    // Navigate to dashboard or main app
    alert('대시보드로 이동합니다!');
  };

  const handleBackToLanding = () => {
    navigate('/cafe-landing');
  };

  return (
    <div className="cafe-map-created">
      <div className="created-container">
        <div className="created-content">
          <div className="success-animation">
            <div className="success-icon">
              <div className="checkmark">✓</div>
            </div>
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
          </div>
          
          <h1 className="created-title">업체 등록 완료!</h1>
          <p className="created-description">
            축하합니다! 업체가 성공적으로 등록되었습니다.<br />
            이제 Bean의 모든 기능을 이용하실 수 있습니다.
          </p>
          
          <div className="created-details">
            <div className="detail-item">
              <div className="detail-icon">🗺️</div>
              <div className="detail-text">
                <h3>지도 등록 완료</h3>
                <p>업체 위치가 지도에 정상적으로 등록되었습니다</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">📋</div>
              <div className="detail-text">
                <h3>업체 정보 저장</h3>
                <p>입력하신 모든 정보가 안전하게 저장되었습니다</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">✅</div>
              <div className="detail-text">
                <h3>서비스 이용 가능</h3>
                <p>주문 관리, 재고 관리 등 모든 기능을 이용하세요</p>
              </div>
            </div>
          </div>
          
          <div className="created-actions">
            <button 
              className="dashboard-btn primary-btn"
              onClick={handleDashboardClick}
            >
              대시보드로 이동
            </button>
            <button 
              className="landing-btn secondary-btn"
              onClick={handleBackToLanding}
            >
              홈으로 돌아가기
            </button>
          </div>
          
          <div className="created-info">
            <h3>🎉 다음 단계</h3>
            <ul>
              <li>메뉴 등록 및 가격 설정</li>
              <li>직원 계정 생성 및 권한 설정</li>
              <li>결제 시스템 연동</li>
              <li>고객 앱 설정 및 배포</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeMapCreated; 