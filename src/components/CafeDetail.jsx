import React, { useState } from 'react';
import './CafeDetail.css';

const CafeDetail = () => {
  const [activeTab, setActiveTab] = useState('홈');

  const handleBackClick = () => {
    console.log('뒤로가기 클릭');
    // 뒤로가기 로직 구현
  };

  const handleMenuClick = () => {
    console.log('메뉴 버튼 클릭');
    // 메뉴 로직 구현
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="cafe-detail">
      {/* 헤더 */}
      <header className="cafe-header">
        <div className="header-content">
          <button className="back-button" onClick={handleBackClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#000000"/>
            </svg>
          </button>
          <h1 className="cafe-title">카페블라블라</h1>
          <button className="menu-button" onClick={handleMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#000000"/>
            </svg>
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="cafe-content">
        {/* 빈자리 정보 */}
        <div className="seat-info">
          <div className="seat-status">
            <div className="seat-row">
              <span className="seat-label">빈자리:</span>
              <span className="seat-count">2 / 10</span>
            </div>
            <div className="seat-row">
              <div className="outlet-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#000000"/>
                </svg>
              </div>
              <span className="outlet-text">콘센트 자리 잔여석: 0 / 2</span>
            </div>
          </div>
        </div>

        {/* 이미지 슬라이더 */}
        <div className="image-slider">
          <div className="slider-container">
            {/* 이미지가 들어갈 자리 */}
            <div className="slider-image"></div>
          </div>
        </div>

        {/* 네비게이션 탭 */}
        <div className="nav-tabs">
          <div className="tab-container">
            <button 
              className={`tab-button ${activeTab === '홈' ? 'active' : ''}`}
              onClick={() => handleTabClick('홈')}
            >
              홈
            </button>
            <button 
              className={`tab-button ${activeTab === '메뉴' ? 'active' : ''}`}
              onClick={() => handleTabClick('메뉴')}
            >
              메뉴
            </button>
            <button 
              className={`tab-button ${activeTab === '사진' ? 'active' : ''}`}
              onClick={() => handleTabClick('사진')}
            >
              사진 3,914
            </button>
            <button 
              className={`tab-button ${activeTab === '리뷰' ? 'active' : ''}`}
              onClick={() => handleTabClick('리뷰')}
            >
              리뷰 1,503
            </button>
          </div>
          <div className="tab-indicator"></div>
        </div>

        {/* 카페 정보 */}
        <div className="cafe-info">
          <div className="info-header">
            <div className="info-left">
              <div className="tag-container">
                <span className="tag">#카공</span>
              </div>
              <div className="rating-container">
                <div className="star-icon">
                  <svg width="13" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="#000000"/>
                  </svg>
                </div>
                <span className="rating">4.9(1,067)</span>
              </div>
            </div>
                         <button className="review-link">전체 리뷰 1,503개 &gt;</button>
          </div>

          <div className="cafe-details">
            <div className="detail-item">
              <div className="location-info">
                <div className="location-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#000000"/>
                  </svg>
                </div>
                <div className="location-text">
                  <span className="station">서울대입구역</span>
                  <span className="separator">|</span>
                  <span className="address">서울 관악구 관악로13길 20</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <div className="time-info">
                <div className="time-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#000000"/>
                  </svg>
                </div>
                <div className="time-text">
                  <span className="status closed">영업종료</span>
                  <span className="hours">오늘(월) 12:00 ~ 18:00</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <div className="menu-info">
                <div className="coffee-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5 3H6c-1.1 0-2 .9-2 2v5.71c0 3.83 2.95 7.18 6.78 7.29 3.96.12 7.22-3.06 7.22-7v-1h.5c1.93 0 3.5-1.57 3.5-3.5S20.43 3 18.5 3zM16 5v3h-2V5h2zM6 5h8v3H6V5z" fill="#000000"/>
                  </svg>
                </div>
                <span className="menu-text">아메리카노 4,500원</span>
              </div>
            </div>
          </div>

          {/* 태그 */}
          <div className="tags">
            <span className="tag-item">카공맛집</span>
            <span className="tag-item">에그타르트</span>
            <span className="tag-item">수제쿠키</span>
            <span className="tag-item">주차 가능</span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="divider"></div>

        {/* 매장 위치 */}
        <div className="location-section">
          <h3 className="section-title">매장 위치</h3>
          <div className="map-container">
            <div className="map-image"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CafeDetail;
