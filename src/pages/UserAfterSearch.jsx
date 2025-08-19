import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Kakaomap from "../components/Kakaomap";
import majesticons from "../assets/majesticons_search.svg";
import logo_white from "../assets/logo_white.png";
import "./UserAfterSearch.css";
import CafeList from "../components/CafeList";

import { getChatbot } from "../apis/api";

const SHEET_HEIGHT = 746; // 풀오픈 높이
const MIN_VISIBLE = 70; // 접었을 때 상단에 남길 높이
const COLLAPSED_DRAG_Y = SHEET_HEIGHT - MIN_VISIBLE; // 746 - 70 = 676
const INITIAL_DRAG_Y = 0; // 초기: 풀오픈

const UserAfterSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navHome = () => navigate("/user-home");

  const passedQuery = location.state?.query || "";

  const [dragY, setDragY] = useState(INITIAL_DRAG_Y); // 0 = 풀오픈
  const [isDragging, setIsDragging] = useState(false);
  const bottomRef = useRef(null);

  const startYRef = useRef(0);
  const initialYRef = useRef(dragY);

  const [bubbleText, setBubbleText] = useState(
    passedQuery || '" 서울대입구역 케이크 맛집 알려줘 "'
  );
  const [inputValue, setInputValue] = useState("");

  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    if (passedQuery) {
      setBubbleText(passedQuery);
      setInputValue("");
    }
  }, [passedQuery]);

  useEffect(() => {
    const getChatbotAPI = async () => {
      const data = await getChatbot(bubbleText);
      setCafes(data);
    };
    getChatbotAPI();
  }, [bubbleText]);

  const applyQueryToBubble = () => {
    const text = inputValue.trim();
    if (text) setBubbleText(text);
  };

  // 공통: Y 좌표
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
    const threshold = COLLAPSED_DRAG_Y / 2; // 338px
    if (dragY < threshold) setDragY(0); // 풀오픈으로 스냅
    else setDragY(COLLAPSED_DRAG_Y); // 70px만 보이도록 스냅
  };

  // 전역 드래그 처리 (마우스+터치)
  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const currentY = getClientY(e);
      const deltaY = currentY - startYRef.current;
      const next = Math.min(
        Math.max(initialYRef.current + deltaY, 0),
        COLLAPSED_DRAG_Y
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
            <span className="logo-text" onClick={navHome}>
              Bean
            </span>
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

        {/* 드래그 가능한 Bottom Sheet */}
        <div
          className="after-search-bottom"
          ref={bottomRef}
          style={{
            transform: `translateX(-50%) translateY(${dragY}px)`,

            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <div className="after-search-frame">
            {/* Bean AI 섹션 */}
            <div className="chat-ai-frame">
              <div className="chat-ai-section">
                <div className="chat-ai-top">
                  <div className="chat-ai-label-wrapper">
                    <div className="chat-ai-label">Bean AI</div>
                  </div>
                  <div className="chat-ai-bubble-wrapper">
                    <p className="chat-ai-bubble">{bubbleText}</p>
                  </div>
                </div>
                <div className="chat-ai-reply-section">
                  <div className="chat-ai-profile-wrapper">
                    <img
                      className="chat-ai-profile"
                      alt="AI"
                      src={logo_white}
                    />
                  </div>
                  <div className="chat-ai-message-area">
                    <div className="chat-ai-message-text">
                      <p className="chat-ai-message">
                        "{bubbleText}"에 대한 검색결과입니다. 잠시만
                        기다려주세요.
                      </p>
                    </div>
                    <div className="chat-ai-loading">
                      <div className="chat-ai-dots">...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 콘텐츠들 (스크롤 리스트) */}
            <div
              className="after-search-container"
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <CafeList key={idx} />
              ))}
            </div>

            {/* 검색 입력 */}
            <div className="user-frame-wrapper">
              <div className="user-div-wrapper">
                <div
                  className="search-bar"
                  onMouseDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()} // 드래그 방지
                >
                  <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applyQueryToBubble();
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  />
                  <img
                    className="search-icon"
                    alt="Search icon"
                    src={majesticons}
                    onClick={applyQueryToBubble}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    style={{ cursor: "pointer" }}
                  />
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
