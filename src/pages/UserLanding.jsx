import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLanding.css';

const UserLanding = () => {
  const handleLogin = () => {
    console.log('로그인 버튼 클릭');
    // 로그인 로직 구현
  };

  const handleSignup = () => {
    console.log('회원가입 버튼 클릭');
    // 회원가입 로직 구현
  };

  return (
    <div className="landing-page">
      {/* 배경 이미지와 오버레이 */}
      <div className="background-container">
        <div className="background-image"></div>
        <div className="background-overlay"></div>
      </div>

      {/* 로고 영역 */}
      <div className="logo-container">
        <div className="logo-background">
          <div className="logo-image">
            <img src="/logo.png" alt="logo" style={{ width: '68px', height: '80px', position: 'absolute', top: '50px', left: '20px' }} />
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        {/* 메인 텍스트 */}
        <div className="main-text-container">
          <h1 className="main-title">Spot your day, here in</h1>
          <h2 className="brand-name">Bean</h2>
        </div>

        {/* 버튼 영역 */}
        <div className="button-container">
          <button className="btn btn-login" onClick={handleLogin}>
            로그인
          </button>
          <button className="btn btn-signup" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLanding;