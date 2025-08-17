import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCafeDetail.css';
import map_image from '../assets/map-image.jpg';
import testdraft from '../assets/test_draft.png';
import locationIcon from '../assets/ion_detail.svg';
import clockIcon from '../assets/mdi_clock_detail.svg';
import starRating from '../assets/star_rating.svg';
import coffeeIcon from '../assets/material-symbols-light_coffee.svg';
import arrowIcon from '../assets/ep_arrow-up.svg';
import menuVector from '../assets/menu-vector.svg';
import ZoomPanUser from '../components/ZoomPanUser';
import TakenSeat from '../components/TakenSeat';
import UntakenSeat from '../components/UntakenSeat';

const UserCafeDetail = () => {
  const [activeTab, setActiveTab] = useState('home');

  /* 8/17 수정 */
  const [showTaken, setShowTaken] = useState(false);
  const toggleTaken = () => setShowTaken(v => !v)

    useEffect(() => {
    const applyBottomOffset = () => {
      const h = window.visualViewport?.height || window.innerHeight; // 주소창 높이 반영
      const bottom = Math.max(0, Math.round(h - 844));               // h > 844이면 그 차이만큼 띄우기
      document.documentElement.style.setProperty('--sheet-bottom', `${bottom}px`);
    };

    applyBottomOffset();
    // 뷰포트 변할 때마다 갱신 (모바일 주소창/회전 등)
    window.addEventListener('resize', applyBottomOffset);
    window.visualViewport?.addEventListener('resize', applyBottomOffset);
    window.visualViewport?.addEventListener('scroll', applyBottomOffset);

    return () => {
      window.removeEventListener('resize', applyBottomOffset);
      window.visualViewport?.removeEventListener('resize', applyBottomOffset);
      window.visualViewport?.removeEventListener('scroll', applyBottomOffset);
    };
  }, []);

  /*여기까지*/


  const tabs = ['home', 'seating', 'menu', 'review']
  const activeIndex = Math.max(0, tabs.indexOf(activeTab));

  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(-1);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderHomeTab = () => (
    <div className="user-cafe-detail-home-tab">
      {/* (주의) 이미지 슬라이더는 여기서 제거했음 */}
      {/* Cafe Information */}
      <div className="user-cafe-info">
        <div className="info-header">
          <div className="user-cafe-tags">
            <span className="user-tag">#카공</span>
            <div className="rating">
              <img src={starRating} className="star-icon" />
              <span>4.9(1,067)</span>
            </div>
          </div>
          <div className="review-link">전체 리뷰 1,503개 &gt;</div>
        </div>

        <div className="info-details">
          <div className="user-detail-item">
            <img src={locationIcon} alt="위치" className="location-icon" />
            <div className="user-detail-text">
              <span className="address">서울 관악구 관악로13길 20</span>
            </div>
          </div>

          <div className="user-detail-item">
            <img src={clockIcon} alt="시간" className="clock-icon" />
            <div className="user-detail-text">
              <span className="status-closed">영업종료</span>
              <span className="open-hours">오늘(월) 12:00 ~ 18:00</span>
            </div>
          </div>

          <div className="user-detail-item">
            <img src={coffeeIcon} alt="커피" className="coffee-icon" />
            <div className="user-detail-text">
              <span>아메리카노 4,500원</span>
            </div>
          </div>
        </div>

        <div className="user-cafe-tags">
          <span className="user-tag">카공맛집</span>
          <span className="user-tag">에그타르트</span>
          <span className="user-tag">수제쿠키</span>
          <span className="user-tag">주차 가능</span>
        </div>
      </div>
      {/* Location Section */}
      <div className="location-section">
        <h3>매장 위치</h3>
        <div className="map-container">
          <img src={map_image} alt="카페 위치 지도" className="map-image" />
        </div>
      </div>
    </div>
  );

  const renderSeatingTab = () => (
    <div className="seating-tab">
      <div className="seating-info">
        <div className="seating-header">
          <div className="seating-count">
            <span> 빈자리: </span>
            <span className="available-count">2</span>
            <span>/</span>
            <span className="total-count">10</span>
          </div>
        </div>

        <div className="seating-description">
          좌석을 클릭하면<br />예약가능 여부 및 자리 정보를 확인하실 수 있습니다.
        </div>

        <div className="seating-draft">
          <ZoomPanUser min={0.5} max={4} step={0.2} src={testdraft} onTap={toggleTaken} />
        </div>
      </div>

      <div className="seating-legend">
        <div className="seating-text-wrapper">좌석 현황:</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <div className="seating-text-wrapper2">빈자리</div>
          </div>
          <div className="legend-item">
            <div className="legend-color occupied"></div>
            <div className="seating-text-wrapper2">이용중</div>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <div className="seating-text-wrapper2">선택 자리</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cafe-detail-container">
      {/* Header */}
      <div className="user-cafe-detail-header">
        <div className="user-header-left">
          <div className="user-back-button">
            <img src={arrowIcon} alt="뒤로가기" className="user-arrow-icon" onClick={handleDetail} />
          </div>
          <div className="user-cafe-title">
            <div className="user-cafe-text-wrapper">카페블라블라</div>
          </div>
        </div>
        <div className="user-cafe-detail-menu-button">
          <img src={menuVector} alt="메뉴탭" />
        </div>
      </div>

      {/* Navigation Tabs (인디케이터는 여기 안에 고정) */}
      <div className="user-cafe-detail-nav-tabs">
        <button
          className={`detail-nav-tab ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabChange('home')}
        >
          홈
        </button>
        <button
          className={`detail-nav-tab ${activeTab === 'seating' ? 'active' : ''}`}
          onClick={() => handleTabChange('seating')}
        >
          좌석 현황
        </button>
        <button className="detail-nav-tab" onClick={() => handleTabChange('menu')}>
          메뉴
        </button>
        <button className="detail-nav-tab" onClick={() => handleTabChange('review')}>
          리뷰 1,503
        </button>

        {/* 탭 텍스트 바로 아래 밑줄 */}
        <span
          className="tab-underline"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      </div>

      {/* ✅ 홈일 때만, 탭과 tab-content 사이에 이미지 삽입 */}
      {activeTab === 'home' && (
        <div className="image-slider">
          <div className="slider-placeholder">
            <span>이미지 슬라이더</span>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'home' ? renderHomeTab() : renderSeatingTab()}
      </div>
      {/* 바텀 시트: 오버레이 클릭으로도 닫히게 유지(선택사항) */}
      <div className={`inline-sheet ${showTaken ? 'open' : ''}`}>
        <TakenSeat />
      </div>
    </div>
  );
};

export default UserCafeDetail;
