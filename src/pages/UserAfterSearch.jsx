import React, { useState, useRef, useEffect } from 'react';
import Kakaomap from '../components/Kakaomap';
import frame343 from '../assets/frame343.png';
import majesticons from '../assets/majesticons:search.svg';
import './UserAfterSearch.css';

const UserAfterSearch = () => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const bottomRef = useRef(null);

  const startYRef = useRef(0);
  const initialYRef = useRef(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
    initialYRef.current = dragY;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const delta = currentY - startYRef.current;
    const newY = Math.min(Math.max(initialYRef.current + delta, -500), 0); // 제한
    setDragY(newY);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // 스냅 포인트
    if (dragY > -150) setDragY(0);
    else setDragY(-500);
  };

  useEffect(() => {
    const bottomEl = bottomRef.current;
    if (bottomEl) {
      bottomEl.style.transform = `translateY(${dragY}px)`;
    }
  }, [dragY]);

  return (
    <div className="home-page">
      {/* 헤더 */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Bean</span>
          </div>
          <button className="menu-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#391d0a" />
            </svg>
          </button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="main-content">
        <div className="image-container">
          <div className="main-image">
            <Kakaomap />
          </div>
        </div>

        {/* 드래그 가능한 Bottom Sheet */}
        <div
          className="after-search-bottom"
          ref={bottomRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="after-search-frame">
            <img className="after-search-img" alt="Frame" src={frame343} />
            <div className="after-search-container">
              <div className="rectangle" />
              <div className="rectangle" />
            </div>
            <div className="user-frame-wrapper">
              <div className="user-div-wrapper">
                <div className="after-search-2">
                  <div className="div-wrapper-2">
                    <div className="after-search-text-wrapper">검색어를 입력하세요.</div>
                  </div>
                </div>
                <div className="majesticons-search">
                  <img className="after-search-vector" alt="Search icon" src={majesticons}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAfterSearch;
