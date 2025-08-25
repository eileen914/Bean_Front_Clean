import { useState, useRef, useEffect } from "react";
import UserSearch from "../components/UserSearch";
import Kakaomap from "../components/Kakaomap";
import "./UserHome.css";

const isMobile = window.innerWidth <= 480;
const SHEET_HEIGHT = 349; 
const INITIAL_VISIBLE = isMobile ? 170 : 110;  
const INITIAL_DRAG_Y = SHEET_HEIGHT - INITIAL_VISIBLE;

const UserHome = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // 바텀시트 오픈 상태
  const bottomSheetRef = useRef(null);

  // 바깥 클릭 핸들러
  useEffect(() => {
    if (!isSheetOpen) return;
    const handleOutsideClick = (e) => {
      if (
        bottomSheetRef.current &&
        !bottomSheetRef.current.contains(e.target)
      ) {
        setIsSheetOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isSheetOpen]);

  // 바텀시트 클릭 시 오픈
  const handleSheetClick = () => {
    setIsSheetOpen(true);
  };

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
        className={`bottom-sheet${isSheetOpen ? " open" : ""}`}
        style={{
          transform: isSheetOpen
            ? "translateY(0)"
            : `translateY(${INITIAL_DRAG_Y}px)`,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
        onClick={() => {
          if (!isSheetOpen) handleSheetClick();
        }}
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