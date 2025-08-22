import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSearch from "../components/UserSearch";
import Kakaomap from "../components/Kakaomap";
import "./UserHome.css";

const SHEET_HEIGHT = 389; // 풀 오픈 시 보이는 높이
const INITIAL_VISIBLE = 115; // 초기 상태에서 보이는 높이
const INITIAL_DRAG_Y = SHEET_HEIGHT - INITIAL_VISIBLE; 
const MAX_DRAG_Y = SHEET_HEIGHT; // 완전 숨김까지 허용 (필요시 389 대신 365 등으로 핸들 피크 고정 가능)

const UserHome = () => {
  const [dragY, setDragY] = useState(INITIAL_DRAG_Y); // 초기: 115px만 보이게
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef(null);

  const startYRef = useRef(0); // 드래그 시작 시점의 포인터 Y
  const initialYRef = useRef(dragY); // 드래그 시작 시점의 dragY 값

  // 공통: 좌표 추출
  const getClientY = (e) => {
    if (e.touches && e.touches[0]) return e.touches[0].clientY;
    if (e.changedTouches && e.changedTouches[0])
      return e.changedTouches[0].clientY;
    return e.clientY;
  };

  // 드래그 시작
  const handleDragStart = (e) => {
    setIsDragging(true);
    startYRef.current = getClientY(e);
    initialYRef.current = dragY;
  };

  // 드래그 종료(스냅)
  const handleDragEnd = () => {
    setIsDragging(false);
    // 0(풀오픈)과 초기 위치(INITIAL_DRAG_Y) 사이의 중간값을 임계값으로 사용
    const snapThreshold = INITIAL_DRAG_Y / 2;
    if (dragY < snapThreshold) {
      setDragY(0); // 완전히 열기
    } else {
      setDragY(INITIAL_DRAG_Y); // 초기 위치로 되돌리기(115px 보이도록)
    }
  };

  // 전역 드래그 처리 (마우스+터치)
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const currentY = getClientY(e);
      const deltaY = currentY - startYRef.current;
      // 0(풀오픈) ~ MAX_DRAG_Y(완전 숨김) 사이로 클램프
      const next = Math.min(
        Math.max(initialYRef.current + deltaY, 0),
        MAX_DRAG_Y
      );
      setDragY(next);
    };

    const handleUp = () => {
      if (!isDragging) return;
      handleDragEnd();
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove, { passive: false });
      document.addEventListener("mouseup", handleUp, { passive: false });
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleUp, { passive: false });
      document.addEventListener("touchcancel", handleUp, { passive: false });
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleUp);
      document.removeEventListener("touchcancel", handleUp);
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
              <path
                d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                fill="#391d0a"
              />
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

        {/* 헤더 */}
        <div className="bottom-sheet-header">
          <div className="header-left">
            <span className="bottom-sheet-title">Bean AI</span>
            <span className="bottom-sheet-subtitle">
              나만의 맞춤 카페를 찾아보세요
            </span>
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