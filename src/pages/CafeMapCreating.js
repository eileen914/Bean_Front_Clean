import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CafeMapCreating.css';

const CafeMapCreating = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/cafe-map-created');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="cafe-map-creating">
      <div className="creating-container">
        <div className="creating-content">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="creating-title">지도 생성 중...</h1>
          <p className="creating-description">
            업체 위치를 지도에 등록하고 있습니다.<br />
            잠시만 기다려주세요.
          </p>
          
          <div className="creating-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="progress-text">업체 정보 처리 중...</p>
          </div>
          
          <div className="creating-steps">
            <div className="step-item completed">
              <div className="step-icon">✅</div>
              <div className="step-text">업체 정보 입력 완료</div>
            </div>
            <div className="step-item active">
              <div className="step-icon">🗺️</div>
              <div className="step-text">지도 위치 등록 중</div>
            </div>
            <div className="step-item">
              <div className="step-icon">📋</div>
              <div className="step-text">업체 등록 완료</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeMapCreating; 