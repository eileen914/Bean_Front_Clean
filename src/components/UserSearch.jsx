import React, { useState } from 'react';
import './UserSearch.css';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색:', searchQuery);
    // 검색 로직 구현
  };

  const handleSearchTermClick = (term) => {
    setSearchQuery(term);
    console.log('검색어 선택:', term);
    // 선택된 검색어로 검색 실행
  };

  return (
    <div className="frame-336">
      {/* 메인 컨테이너 */}
      <div className="search-container">
        {/* 헤더 */}
        <div className="header">
          <div className="header-content">
            <div className="divider"></div>
            <div className="logo-section">
              <span className="logo-text">Bean AI</span>
            </div>
          </div>
        </div>

        {/* 서브타이틀 */}
        <div className="subtitle">
          <span className="subtitle-text">나만의 맞춤 카페를 찾아보세요</span>
        </div>

        {/* 추천 검색어 섹션 */}
        <div className="search-section">
          <div className="section-title">
            <span className="title-text">추천 검색어</span>
          </div>
          <div className="search-terms">
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('서울대입구역 케이크 맛집 알려줘')}
            >
              " 서울대입구역<br />
              케이크 맛집 알려줘 "
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('합정에서 카공하기 좋은 카페 알려줘')}
            >
              " 합정에서 카공하기<br />
              좋은 카페 알려줘"
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('성수에서 요새 핫한 카페 추천해줘')}
            >
              " 성수에서 요새 핫한<br />
              카페 추천해줘 "
            </button>
          </div>
        </div>

        {/* 최근 검색어 섹션 */}
        <div className="search-section">
          <div className="section-title">
            <span className="title-text">최근 검색어</span>
          </div>
          <div className="search-terms">
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('이 근처 빈자리 있는 카페 알려줘')}
            >
              " 이 근처 빈자리 있는<br />
              카페 알려줘 "
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('우리동네 휘낭시에 맛집')}
            >
              " 우리동네<br />
              휘낭시에 맛집"
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('12시 이후에 닫는 카페')}
            >
              " 12시 이후에<br />
              닫는 카페 "
            </button>
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
export default UserSearch;