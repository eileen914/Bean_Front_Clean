import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Kakaomap from "../components/Kakaomap";
import majesticons from "../assets/majesticons_search.svg";
import logo_white from "../assets/logo_white.png";
import "./UserAfterSearch.css";
import CafeList from "../components/CafeList";

const UserAfterSearch = () => {
  const location = useLocation();
  const passedQuery = location.state?.query || "";

  const initialSheetHeight = window.innerHeight * 0.5;
  const [dragY, setDragY] = useState(initialSheetHeight); // 초기 위치: 절반 아래
  const [isDragging, setIsDragging] = useState(false);
  const bottomRef = useRef(null);

  const startYRef = useRef(0);
  const initialYRef = useRef(dragY);

  const [bubbleText, setBubbleText] = useState(
    passedQuery || '" 서울대입구역 케이크 맛집 알려줘 "'
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (passedQuery) {
      setBubbleText(passedQuery);
      setInputValue("");
    }
  }, [passedQuery]);

  const applyQueryToBubble = () => {
    const text = inputValue.trim();
    if (text) setBubbleText(text);
  };

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
      const newY = Math.min(
        Math.max(initialYRef.current + deltaY, 0),
        initialSheetHeight
      );
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
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
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

            {/* 콘텐츠들 */}
            <div className="after-search-container">
              <CafeList />
              <CafeList />
            </div>

            {/* 검색 입력 */}
            <div className="user-frame-wrapper">
              <div className="user-div-wrapper">
                <div className="search-bar">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="검색어를 입력하세요."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applyQueryToBubble();
                    }}
                  />
                  <img
                    className="search-icon"
                    alt="Search icon"
                    src={majesticons}
                    onClick={applyQueryToBubble}
                    onMouseDown={(e) => e.stopPropagation()} // ★ 드래그 방지
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
