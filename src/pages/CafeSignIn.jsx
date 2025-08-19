import React, { useRef, useState } from "react";
import "./CafeSignIn.css";
import { useNavigate } from "react-router-dom";
import { signIn, checkLogin } from "../apis/api";

const CafeSignIn = () => {
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleSignInData = (e) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };

  const handleSignIn = async (e) => {
    // TODO: 백엔드 연동 시 여기에 로그인 요청 코드 추가
    e.preventDefault(); // to prevent reloading the page
    await signIn(signInData); // 200 이어야 통과 (쿠키 세팅)
    // 선택: 쿠키 적용 확인(권장)
    await checkLogin(); // 200이면 인증 OK
    navigate("/cafe-update", { replace: true });
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
          required
          type="text"
          id="username"
          name="username"
          className="signin-input"
          value={signInData.username}
          onChange={handleSignInData}
          placeholder="아이디를 입력해주세요"
        />
        <input
          required
          type="password"
          id="password"
          name="password"
          className="signin-input"
          value={signInData.password}
          onChange={handleSignInData}
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
