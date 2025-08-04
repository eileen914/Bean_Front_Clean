import React, { useState, useRef, useEffect } from 'react';
import UserSearch from '../components/UserSearch';

import './UserHome.css';

const UserHome = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentY, setCurrentY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const overlayRef = useRef(null);

  const handleMenuClick = () => {
    console.log('메뉴 버튼 클릭');
    // 메뉴 로직 구현
  };

  const toggleBottomSheet = () => {
    setIsOpen(!isOpen);
    setCurrentY(isOpen ? 0 : 0);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY - currentY);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY - currentY);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const newY = e.touches[0].clientY - startY;
    const maxY = window.innerHeight * 0.7; // 최대 70%까지 올라감
    
    if (newY <= 0) {
      setCurrentY(0);
    } else if (newY >= maxY) {
      setCurrentY(maxY);
    } else {
      setCurrentY(newY);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newY = e.clientY - startY;
    const maxY = window.innerHeight * 0.7; // 최대 70%까지 올라감
    
    if (newY <= 0) {
      setCurrentY(0);
    } else if (newY >= maxY) {
      setCurrentY(maxY);
    } else {
      setCurrentY(newY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = window.innerHeight * 0.35; // 35% 임계값
    
    if (currentY < threshold) {
      setCurrentY(0);
      setIsOpen(true);
    } else {
      setCurrentY(window.innerHeight * 0.7);
      setIsOpen(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = window.innerHeight * 0.35; // 35% 임계값
    
    if (currentY < threshold) {
      setCurrentY(0);
      setIsOpen(true);
    } else {
      setCurrentY(window.innerHeight * 0.7);
      setIsOpen(false);
    }
  };

  const handleOverlayClick = () => {
    setCurrentY(window.innerHeight * 0.7);
    setIsOpen(false);
  };

  // 마우스 이벤트 리스너
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, currentY]);

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
          <div className="main-image"></div>
        </div>
      </main>

      {/* 채팅 버튼 */}
      <button className="chat-toggle-btn" onClick={toggleBottomSheet}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="#391d0a"/>
        </svg>
      </button>

      {/* 오버레이 */}
      {(isOpen || currentY < window.innerHeight * 0.7) && (
        <div 
          ref={overlayRef}
          className="bottom-sheet-overlay" 
          onClick={handleOverlayClick}
          style={{ opacity: Math.max(0, 1 - (currentY / (window.innerHeight * 0.7))) }}
        />
      )}

      {/* Bottom Sheet */}
      <div 
        ref={bottomSheetRef}
        className={`bottom-sheet ${isOpen ? 'open' : ''}`}
        style={{ 
          transform: `translateX(-50%) translateY(${currentY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* 드래그 핸들 */}
        <div className="drag-handle">
          <div className="handle-bar"></div>
        </div>
        
        {/* 헤더 */}
        <div className="bottom-sheet-header">
          <div className="header-left">
            <span className="bottom-sheet-title">Bean AI</span>
            <div className="header-divider"></div>
          </div>
          <button className="close-btn" onClick={handleOverlayClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#391d0a"/>
            </svg>
          </button>
        </div>
        
        {/* 콘텐츠 */}
        <div className="bottom-sheet-content">
          <UserSearch />
        </div>
      </div>
    </div>
  );
};

export default UserHome;