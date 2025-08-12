import React, { useRef, useState } from "react";
import "./CafeRegister2.css";
import { useNavigate } from "react-router-dom";

const CafeRegister2 = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleNextClick = () => {
    navigate("/cafe-map-creating");
  };

  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setUploadedFiles([]);
  };

  return (
    <div className="cafe-register">
      <header className="register-fixed-header">
        <div className="header-content">
          <img src="/logo.png" alt="Bean Logo" className="header-logo" />
          <h1 className="header-text" onClick={handleLogoClick}>
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
                <span>Step 1</span>
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
              <textarea
                placeholder="카페에 대한 한줄 설명을 적어주세요"
                rows={3}
              ></textarea>
            </div>
          </form>
        </section>

        <section className="register2-step">
          <div className="register2-step-header-wrapper">
            <div className="register2-step-header">
              <div className="step-label-box">
                <span>Step 2</span>
                <span>매장 사진 업로드하기</span>
              </div>
              <div className="step-header-text">
                테이블 및 좌석 정보를 알 수 있는 매장 도면 사진을
                업로드해주세요.
              </div>
            </div>
          </div>

          <div className="upload-section">
            <div
              className="upload-box"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="upload-icon">
                <img src="/icons/upload-icon.png" alt="업로드 아이콘" />
              </div>
              <p>파일을 여기로 드래그하여 업로드하세요.</p>
              <p className="upload-hint">(파일 형식: PNG, JPG)</p>
              <button
                className="upload-btn"
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                파일 선택
              </button>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept=".png, .jpg, .jpeg"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div className="file-list-section">
              {uploadedFiles.map((file, index) => (
                <div className="file-item" key={index}>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <button className="file-view-btn">파일 보기</button>
                </div>
              ))}
              {uploadedFiles.length > 0 && (
                <button className="reset-btn" onClick={handleReset}>
                  초기화하기
                </button>
              )}
            </div>
          </div>
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

// 여기 참고: https://as-you-say.tistory.com/380

// 백엔드 연동 시 다음 부분을 서버로 전달하도록 수정 필요:
// 1. uploadedFiles 상태를 서버로 POST 요청으로 전송
// 2. 파일 업로드를 위한 API endpoint (예: /api/upload) 구현 및 axios 또는 fetch 사용
// 3. drag & drop 또는 input 변경 시 서버와 실시간 연동이 필요하다면 업로드 직후 handleFileChange 안에서 서버 호출
