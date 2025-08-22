// 사용자 홈 페이지
// - 지도, 검색, 드래그 가능한 바텀시트 등 UI 구성

import React, { useState, useRef, useEffect } from "react";
import UserSearch from "../components/UserSearch";
import Kakaomap from "../components/Kakaomap";
import "./UserHome.css";

// 바텀시트 관련 상수
const SHEET_HEIGHT = 389; // 풀 오픈 시 높이
const INITIAL_VISIBLE = 115; // 초기 보이는 높이
const INITIAL_DRAG_Y = SHEET_HEIGHT - INITIAL_VISIBLE; 
const MAX_DRAG_Y = SHEET_HEIGHT;

const UserHome = () => {
  // 바텀시트 Y 위치 및 드래그 상태
  const [dragY, setDragY] = useState(INITIAL_DRAG_Y);
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef(null);
  const startYRef = useRef(0);
  const initialYRef = useRef(dragY);

  // Y 좌표 추출 (마우스/터치)
  const getClientY = (e) =>
    e.touches?.[0]?.clientY ?? e.changedTouches?.[0]?.clientY ?? e.clientY;

  // 드래그 시작
  const handleDragStart = (e) => {
    setIsDragging(true);
    startYRef.current = getClientY(e);
    initialYRef.current = dragY;
  };

  // 드래그 종료(스냅)
  const handleDragEnd = () => {
    setIsDragging(false);
    setDragY(dragY < INITIAL_DRAG_Y / 2 ? 0 : INITIAL_DRAG_Y);
  };

  // 전역 드래그 처리 (마우스+터치)
  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e) => {
      const currentY = getClientY(e);
      const deltaY = currentY - startYRef.current;
      setDragY((prev) => {
        const next = Math.min(Math.max(initialYRef.current + deltaY, 0), MAX_DRAG_Y);
        return next;
      });
    };
    const handleUp = () => handleDragEnd();
    document.addEventListener("mousemove", handleMove, { passive: false });
    document.addEventListener("mouseup", handleUp, { passive: false });
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleUp, { passive: false });
    document.addEventListener("touchcancel", handleUp, { passive: false });
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("touchcancel", handleUp);
    };
  }, [isDragging]);

  return (
    <div className="home-page">
      {/* ===== 헤더 영역 ===== */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">Bean</span>
          </div>
          <button className="menu-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                fill="#391d0a"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ===== 메인 콘텐츠 영역 ===== */}
      <main className="main-content">
        <div className="image-container">
          <div className="main-image">
            <Kakaomap />
          </div>
        </div>
      </main>

      {/* ===== 바텀시트 영역 ===== */}
      <div
        ref={bottomSheetRef}
        className="bottom-sheet"
        style={{
          transform: `translateX(-50%) translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
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

        {/* 바텀시트 헤더 */}
        <div className="bottom-sheet-header">
          <div className="header-left">
            <span className="bottom-sheet-title">Bean AI</span>
            <span className="bottom-sheet-subtitle">
              나만의 맞춤 카페를 찾아보세요
            </span>
          </div>
        </div>

        {/* 바텀시트 콘텐츠 */}
        <div className="bottom-sheet-content">
          <UserSearch />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
