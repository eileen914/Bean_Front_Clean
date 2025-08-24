import { useState, useRef, useEffect } from "react";
import UserSearch from "../components/UserSearch";
import Kakaomap from "../components/Kakaomap";
import "./UserHome.css";

const SHEET_HEIGHT = 349; 
const INITIAL_VISIBLE = 110;
const INITIAL_DRAG_Y = SHEET_HEIGHT - INITIAL_VISIBLE;
const MAX_DRAG_Y = SHEET_HEIGHT; 

const UserHome = () => {
  const [dragY, setDragY] = useState(INITIAL_DRAG_Y); 
  const [isDragging, setIsDragging] = useState(false);
  const bottomSheetRef = useRef(null);

  const startYRef = useRef(0); 
  const initialYRef = useRef(dragY);
  
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
  const handleDragEndFn = () => {
    setIsDragging(false);
    const snapThreshold = INITIAL_DRAG_Y / 2;
    if (dragY < snapThreshold) {
      setDragY(0);
    } else {
      setDragY(INITIAL_DRAG_Y);
    }
  };
  const handleDragEnd = useRef(handleDragEndFn);

  // 전역 드래그 처리
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const currentY = getClientY(e);
      const deltaY = currentY - startYRef.current;
      const next = Math.min(
        Math.max(initialYRef.current + deltaY, 0),
        MAX_DRAG_Y
      );
      setDragY(next);
    };

    const handleUp = () => {
      if (!isDragging) return;
      handleDragEnd.current();
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
    <div className="app-frame">
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
      <main className="map-main-content">
        <Kakaomap />
      </main>

      {/* Bottom Sheet */}
      <div
        ref={bottomSheetRef}
        className="bottom-sheet"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? "none" : "transform 0.25s ease",
        }}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEndFn}        
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEndFn}  
      >
        <div className="drag-handle">
          <div className="handle-bar"></div>
        </div>
        <div className="bottom-sheet-content">
          <UserSearch />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
