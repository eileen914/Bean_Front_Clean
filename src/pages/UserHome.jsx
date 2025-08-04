import React from 'react';
import './UserHome.css';

const UserHome = () => {
  const handleMenuClick = () => {
    console.log('메뉴 버튼 클릭');
    // 메뉴 로직 구현
  };

  return (
    <div className="home-page">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Bean</span>
          </div>
          <button className="menu-button" onClick={handleMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#391d0a"/>
            </svg>
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <div className="image-container">
          <div className="main-image">
            {/* 이미지는 CSS에서 background-image로 설정 */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserHome;