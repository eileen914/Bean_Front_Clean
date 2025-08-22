// 카페 등록 2단계 페이지
// - 회원가입 및 카페 정보 입력, 등록 처리

import React, { useRef, useState, useEffect } from "react";
import "./CafeRegister2.css";
import { useNavigate } from "react-router-dom";
import { signUp, checkLogin, createCafe } from "../apis/api";

const CafeRegister2 = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // ===== 파일 업로드 관련 상태 (추후 확장 가능) =====
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // ===== 회원가입 정보 상태 =====
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
  });

  // ===== 카페 정보 상태 =====
  const [cafeData, setCafeData] = useState({
    name: "",
    address: "",
    description: "",
  });

  // ===== 에러 메시지 및 처리 상태 =====
  const [errorMsg, setErrorMsg] = useState("");
  const [issigningUp, setIssigningUp] = useState(false);

  const handleSignUpData = (e) => {
  // 회원가입 입력값 변경 핸들러
  const { name, value } = e.target;
  setSignUpData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCafeData = (e) => {
  // 카페 정보 입력값 변경 핸들러
  const { name, value } = e.target;
  setCafeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ===== 입력값 검증 =====
    if (!signUpData.username.trim() || !signUpData.password.trim()) {
      setErrorMsg("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    if (!cafeData.name.trim() || !cafeData.address.trim()) {
      setErrorMsg("업체명과 주소는 필수입니다.");
      return;
    }

    // ===== 회원가입 API 호출 =====
    await signUp(signUpData);
    setIssigningUp(true);
  };

  useEffect(async () => {
  // ===== 카페 생성 및 등록 완료 처리 =====
  if (!issigningUp) return;
  createCafe(cafeData);

  // 등록 성공 시 로그인 페이지로 이동
  alert("업체 등록이 완료되었습니다.");
  navigate("/cafe-signin");
  }, [issigningUp]);

  const handleLogoClick = () => {
  // 헤더 로고 클릭 시 홈으로 이동
  navigate("/cafe-landing");
  };

  return (
    <div className="cafe-register">
      {/* ===== 헤더 영역 ===== */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>

      {/* ===== 메인 컨텐츠 영역 ===== */}
      <div className="register2-container">
        <h2 className="register2-title">업체 등록하기</h2>

        {/* ===== 필수 정보 입력 영역 ===== */}
        <section className="register2-step">
          <div className="register2-step-header-wrapper">
            <div className="register2-step-header">
              <div className="step-label-box">
                <span>필수 정보 입력하기</span>
              </div>
              <div className="step-header-text">
                업체명, 상세설명, 대표키워드 등 우리 가게 정보를 알려주세요.
                <br />
                이외 상세정보는 업체 등록 이후 수정하실 수 있습니다.
              </div>
            </div>
          </div>

          {/* ===== 입력 폼 영역 ===== */}
          <form className="register2-form">
            {/* 업체명 입력 */}
            <div className="register2-form-row">
              <label>업체명</label>
              <input
                required
                type="text"
                id="name"
                name="name"
                className="input"
                value={cafeData.name}
                onChange={handleCafeData}
                placeholder="최대 30자"
              />
            </div>
            {/* 아이디 입력 */}
            <div className="register2-form-row">
              <label>아이디</label>
              <input
                required
                type="text"
                id="username"
                name="username"
                className="input"
                value={signUpData.username}
                onChange={handleSignUpData}
                placeholder="빈자리 서비스에 활용할 아이디를 입력해주세요"
              />
            </div>
            {/* 비밀번호 입력 */}
            <div className="register2-form-row">
              <label>비밀번호</label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="input"
                value={signUpData.password}
                onChange={handleSignUpData}
                placeholder="빈자리 서비스에 활용할 비밀번호를 입력해주세요"
              />
            </div>
            {/* 전화번호 입력 (추후 확장 가능) */}
            <div className="register2-form-row">
              <label>전화번호</label>
              <input type="tel" placeholder="숫자만 입력해주세요" />
            </div>
            {/* 업체 주소 입력 */}
            <div className="register2-form-row">
              <label>업체 주소</label>
              <input
                required
                type="text"
                id="address"
                name="address"
                className="input"
                value={cafeData.address}
                onChange={handleCafeData}
                placeholder="상세 주소까지 한 줄로 입력해주세요"
              />
            </div>
            {/* 카페 설명 입력 */}
            <div className="register2-form-row">
              <label>카페 설명</label>
              <textarea
                id="description"
                name="description"
                className="input"
                placeholder="카페에 대한 한줄 설명을 적어주세요"
                rows={3}
                value={cafeData.description}
                onChange={handleCafeData}
              ></textarea>
            </div>
          </form>
        </section>

        {/* ===== 등록 버튼 영역 ===== */}
        <div className="register2-footer">
          <button className="register-button" onClick={handleNextClick}>
            업체 등록 완료하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeRegister2;
