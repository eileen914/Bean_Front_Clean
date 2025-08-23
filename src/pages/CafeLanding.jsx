// 카페 랜딩(메인) 페이지
// - 로그인/업체 등록 버튼, 로고, 인테리어 이미지 등으로 구성

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CafeLanding.css";
import { checkLogin, signOut } from "../apis/api";

const CafeLanding = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // 로그인 여부 상태, 우선 false로 초기화

  useEffect(() => {
    const setLoginStatus = async () => {
      const result = await checkLogin();
      setIsUserLoggedIn(result);
    };
    setLoginStatus();
  }, []);

  // 로그인 버튼 클릭 시 로그인 페이지로 이동
  const handleSignInClick = () => {
    navigate("/cafe-signin");
  };

  // 업체 등록 버튼 클릭 시 등록 페이지로 이동
  const handleRegisterClick = () => {
    navigate("/cafe-register-1");
  };

  // 로그아웃
  const handleSignOut = async () => {
    try {
      const result = await signOut();
      console.log("로그아웃 결과:", result);
      setIsUserLoggedIn(false);
    } finally {
      navigate("/cafe-landing", { replace: true });
    }
  };

  const handleMyCafeClick = () => {
    navigate("/cafe-update");
  };

  return (
    <div className="cafe-landing">
      <div className="cafe-landing-container">
        {/* ===== 상단 헤더 영역 ===== */}
        <header className="cafe-landing-header">
          {isUserLoggedIn ? (
            <div className="cafe-header-buttons">
              {/* 로그인 버튼: 로그인 페이지로 이동 */}
              <button
                className="cafe-header-btn signin-btn"
                onClick={handleSignOut}
              >
                로그아웃
              </button>
              {/* 업체 등록 버튼: 등록 페이지로 이동 */}
              <button
                className="cafe-header-btn register-btn"
                onClick={handleMyCafeClick}
              >
                나의 카페 관리
              </button>
            </div>
          ) : (
            <div className="cafe-header-buttons">
              {/* 로그인 버튼: 로그인 페이지로 이동 */}
              <button
                className="cafe-header-btn signin-btn"
                onClick={handleSignInClick}
              >
                로그인
              </button>
              {/* 업체 등록 버튼: 등록 페이지로 이동 */}
              <button
                className="cafe-header-btn register-btn"
                onClick={handleRegisterClick}
              >
                업체 등록하기
              </button>
            </div>
          )}
        </header>

        {/* ===== 메인 콘텐츠 영역 ===== */}
        <main className="landing-main">
          {/* 로고 영역 */}
          <div className="logo-area">
            <h1 className="main-logo">BEAN</h1>
            <img src="/logo.png" alt="Bean Logo" className="bean-logo" />
          </div>

          {/* 인테리어 이미지 영역 */}
          <div className="cafe-image-container">
            <img
              src="/default_landing.png"
              alt="Cafe Interior"
              className="cafe-interior-image"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CafeLanding;
