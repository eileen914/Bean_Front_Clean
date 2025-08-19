import React, { useRef, useState } from "react";
import "./CafeRegister2.css";
import { useNavigate } from "react-router-dom";

const CafeRegister2 = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleNextClick = () => {
    navigate("/cafe-signin");
  };

  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  return (
    <div className="cafe-register">
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>

      <div className="register2-container">
        <h2 className="register2-title">업체 등록하기</h2>

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

          <form className="register2-form">
            <div className="register2-form-row">
              <label>업체명</label>
              <input type="text" placeholder="최대 30자" />
            </div>
            <div className="register2-form-row">
              <label>아이디</label>
              <input
                type="text"
                placeholder="빈자리 서비스에 활용할 아이디를 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="빈자리 서비스에 활용할 비밀번호를 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>전화번호</label>
              <input type="tel" placeholder="숫자만 입력해주세요" />
            </div>
            <div className="register2-form-row">
              <label>업체 주소</label>
              <input
                type="text"
                placeholder="상세 주소까지 한 줄로 입력해주세요"
              />
            </div>
            <div className="register2-form-row">
              <label>카페 설명</label>
              <input
                placeholder="카페에 대한 한줄 설명을 적어주세요"
              ></input>
            </div>
          </form>
        </section>   

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