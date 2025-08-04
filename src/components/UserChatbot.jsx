import React, { useState } from 'react';
import './UserChatbot.css';

const UserChatbot = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색:', searchQuery);
    // 검색 로직 구현
  };

  return (
    <div className="frame-337">
      {/* 메인 컨테이너 */}
      <div className="chat-container">
        {/* 헤더 */}
        <div className="header">
          <div className="header-content">
            <div className="divider"></div>
            <div className="logo-section">
              <span className="logo-text">Bean AI</span>
            </div>
          </div>
        </div>

        {/* 사용자 메시지 */}
        <div className="user-message">
          <div className="message-bubble">
            <span className="message-text">
              " 서울대입구역<br />
              케이크 맛집 알려줘 "
            </span>
          </div>
        </div>

        {/* AI 응답 */}
        <div className="ai-response">
          <div className="ai-profile">
            <div className="profile-image">
              <img src="/logo.png" alt="AI Profile" />
            </div>
          </div>
          <div className="response-content">
            <div className="response-text">
              서울대입구역 근처에 있는 케이크 맛집을 추천해드릴게요.<br />
              잠시만 기다려주세요.
            </div>
            <div className="loading-dots">...</div>
          </div>
        </div>

        {/* 카페 리스트 */}
        <div className="cafe-list">
          {/* 첫 번째 카페 */}
          <div className="cafe-card">
            <div className="cafe-header">
              <div className="cafe-info">
                <span className="cafe-name">카페블라블라</span>
                <div className="rating-badge">
                  <span className="coffee-icon">☕</span>
                  <span className="rating-text">2 / 10</span>
                </div>
              </div>
              <button className="bookmark-btn">🔖</button>
            </div>
            
            <div className="cafe-details">
              <div className="rating-location">
                <div className="rating-section">
                  <span className="rating">4.9 (1,067)</span>
                  <span className="tag"># 카공</span>
                </div>
                <div className="location">
                  <span className="location-icon">📍</span>
                  <span className="location-text">서울대입구역</span>
                </div>
              </div>
              
              <div className="business-hours">
                <span className="clock-icon">🕐</span>
                <span className="status">영업종료</span>
                <span className="hours">오늘(월) 12:00 ~ 18:00</span>
              </div>
            </div>
            
            <div className="cafe-images">
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
            </div>
          </div>

          {/* 두 번째 카페 */}
          <div className="cafe-card">
            <div className="cafe-header">
              <div className="cafe-info">
                <span className="cafe-name">마인드멜드</span>
                <div className="rating-badge">
                  <span className="coffee-icon">☕</span>
                  <span className="rating-text">2 / 10</span>
                </div>
              </div>
              <button className="bookmark-btn">🔖</button>
            </div>
            
            <div className="cafe-details">
              <div className="rating-location">
                <div className="rating-section">
                  <span className="rating">4.9 (1,067)</span>
                  <span className="tag"># 카공</span>
                </div>
                <div className="location">
                  <span className="location-icon">📍</span>
                  <span className="location-text">서울대입구역</span>
                </div>
              </div>
              
              <div className="business-hours">
                <span className="clock-icon">🕐</span>
                <span className="status">영업종료</span>
                <span className="hours">오늘(월) 12:00 ~ 18:00</span>
              </div>
            </div>
            
            <div className="cafe-images">
              <div className="image-placeholder"></div>
              <div className="image-placeholder"></div>
            </div>
          </div>
        </div>

        {/* 검색 바 */}
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserChatbot;