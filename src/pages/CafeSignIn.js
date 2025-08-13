import React from "react";
import "./CafeSignIn.css";
import { useNavigate } from "react-router-dom";

const CafeSignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // TODO: 백엔드 연동 시 여기에 로그인 요청 코드 추가
    console.log("로그인 시도");
  };

  const goToRegister = () => {
    navigate("/cafe-register-1");
  };

  return (
    <div className="cafe-signin">
      {/* 고정 헤더 */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text">Bean</h1>
        </div>
      </header>

      <div className="signin-box">
        <h2>로그인</h2>
        <input
          type="text"
          className="signin-input"
          placeholder="아이디를 입력해주세요"
        />
        <input
          type="password"
          className="signin-input"
          placeholder="비밀번호를 입력해주세요"
        />
        <div className="signin-subtext">아이디 찾기 ㅣ 비밀번호 찾기</div>

        <div className="cafe-signin-buttons">
          <button className="cafe-signin-btn login" onClick={handleSignIn}>
            로그인
          </button>
          <button className="cafe-signin-btn register" onClick={goToRegister}>
            업체 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeSignIn;
