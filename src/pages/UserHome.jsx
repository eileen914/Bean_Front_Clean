import React, { useState, useRef, useEffect } from 'react';
import UserSearch from '../components/UserSearch';
import Kakaomap from '../components/Kakaomap';
import './UserHome.css';


const UserHome = () => {
  const initialSheetHeight = window.innerHeight * 0.5;
  const [dragY, setDragY] = useState(initialSheetHeight); // 초기 위치: 절반 아래
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef(null);

  const startYRef = useRef(0);
  const initialYRef = useRef(dragY);

  // 드래그 시작
  const handleDragStart = (e) => {
    setIsDragging(true);
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
    initialYRef.current = dragY;
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setIsDragging(false);
    const threshold = initialSheetHeight / 2;
    if (dragY < threshold) {
      setDragY(0); // 완전히 열기
    } else {
      setDragY(initialSheetHeight); // 절반만 보이기
    }
  };

  // 마우스 전역 이벤트 처리
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startYRef.current;
      const newY = Math.min(Math.max(initialYRef.current + deltaY, 0), initialSheetHeight);
      setDragY(newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const threshold = initialSheetHeight / 2;
      if (dragY < threshold) {
        setDragY(0);
      } else {
        setDragY(initialSheetHeight);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragY]);

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
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#391d0a"/>
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
      </main>

      {/* Bottom Sheet */}
      <div 
        ref={bottomSheetRef}
        /*className={`bottom-sheet ${isOpen ? 'open' : ''}`}*/
        style={{ 
          transform: `translateX(-50%) translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {/* 드래그 핸들 */}
        <div className="drag-handle">
          <div className="handle-bar"></div>
        </div>
        
        {/* 헤더 */}
        <div className="bottom-sheet-header">
          <div className="header-left">
            <span className="bottom-sheet-title">Bean AI</span>
            <span className="bottom-sheet-subtitle">나만의 맞춤 카페를 찾아보세요</span>
            <div className="header-divider"></div>
          </div>
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
