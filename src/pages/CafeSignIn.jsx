// 카페 점주 로그인 페이지
// - 로그인 폼, 회원가입 이동, 인증 처리 등

import React, { useRef, useState } from "react";
import "./CafeSignIn.css";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  getLoginInfo,
  getOwnerCafes,
  listCafeFloorPlans,
} from "../apis/api";

const CafeSignIn = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // ===== 로그인 정보 상태 =====
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const handleSignInData = (e) => {
    // 로그인 입력값 변경 핸들러
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };

  const handleSignIn = async (e) => {
    // TODO: 백엔드 연동 시 여기에 로그인 요청 코드 추가
    e.preventDefault(); // to prevent reloading the page
    const result = await signIn(signInData); // 200 이어야 통과 (쿠키 세팅)
    // 선택: 쿠키 적용 확인(권장)
    if (result.status === 200) {
      const ownerResult = await getLoginInfo(); // 200 이어야 통과
      const owner = ownerResult.data;
      const cafes = await getOwnerCafes(owner.id);
      const cafeId = cafes[0]?.id;
      const floorPlan = await listCafeFloorPlans(cafeId);
      const floorPlanId = floorPlan[0]?.id;
      navigate("/cafe-update", { state: { cafeId, floorPlanId } });
    } else {
      alert(result.message);
    }
  };

  const goToRegister = () => {
    // 회원가입(업체 등록) 페이지로 이동
    navigate("/cafe-register-1");
  };

  return (
    <div className="cafe-signin">
      {/* ===== 헤더 영역 ===== */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text">Bean</h1>
        </div>
      </header>

      {/* ===== 로그인 폼 영역 ===== */}
      <div className="signin-box">
        <h2>로그인</h2>
        {/* 아이디 입력 */}
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
        {/* 비밀번호 입력 */}
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
        {/* 아이디/비밀번호 찾기 안내 */}
        <div className="signin-subtext">아이디 찾기 ㅣ 비밀번호 찾기</div>

        {/* 로그인/회원가입 버튼 영역 */}
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
