
import React, { useState } from 'react';
import './UserSearch.css';
import { useNavigate } from 'react-router-dom';
import majesticons from '../assets/majesticons_search.svg';

/**
 * UserSearch 컴포넌트
 * - 역할: 검색어 입력 및 추천/최근 검색어 버튼 제공, 검색 결과 페이지로 이동
 * - props: 없음
 * - 유저 플로우: 검색어 입력 → 검색 아이콘 클릭 → /user-after-search로 이동
 */
const UserSearch = () => {
  // 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // 검색 결과 페이지로 이동
  const goAfterSearch = () => {
    navigate('/user-after-search', { state: { query: searchQuery } });
  };

  // 추천/최근 검색어 버튼 클릭 시 검색어 입력란에 반영
  const handleSearchTermClick = (term) => {
    setSearchQuery(term);
  };

  // UI 렌더링
  return (
    <div className="frame-336">
      {/* BottomSheet 헤더 */}
      <div className="bottom-sheet-header">
        <div className="header-left">
          <span className="bottom-sheet-title">Bean AI</span>
          <span className="bottom-sheet-subtitle">
            나만의 맞춤 카페를 찾아보세요
          </span>
        </div>
      </div>
      {/* 메인 컨테이너 */}
      <div className="search-container">
        {/* ...기존 검색 UI 그대로... */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) => {
              if (!searchQuery) e.target.placeholder = '검색어를 입력하세요.';
            }}
            className="search-input"
          />
          <img
            className="search-icon"
            alt="Search icon"
            src={majesticons}
            onClick={goAfterSearch}
            style={{ cursor: 'pointer' }}
          />
        </div>
        {/* 추천/최근 검색어 섹션은 기존과 동일하게 유지 */}
        <div className="search-section">
          <div className="section-title">
            <span className="title-text">추천 검색어</span>
          </div>
          <div className="search-terms">
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('서울대입구역 케이크 맛집 알려줘')}
            >
              " 서울대입구역<br />케이크 맛집 알려줘 "
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('합정에서 카공하기 좋은 카페 알려줘')}
            >
              " 합정에서 카공하기<br />좋은 카페 알려줘"
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('성수에서 요새 핫한 카페 추천해줘')}
            >
              " 성수에서 요새 핫한<br />카페 추천해줘 "
            </button>
          </div>
        </div>
        <div className="search-section">
          <div className="section-title">
            <span className="title-text">최근 검색어</span>
          </div>
          <div className="search-terms">
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('이 근처 빈자리 있는 카페 알려줘')}
            >
              " 이 근처 빈자리 있는<br />카페 알려줘 "
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('우리동네 휘낭시에 맛집')}
            >
              " 우리동네<br />휘낭시에 맛집"
            </button>
            <button 
              className="search-term-btn"
              onClick={() => handleSearchTermClick('12시 이후에 닫는 카페')}
            >
              " 12시 이후에<br />닫는 카페 "
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;