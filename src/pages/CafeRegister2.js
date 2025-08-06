import React from "react";
import "./CafeRegister2.css";
import { useNavigate } from "react-router-dom";

const CafeRegister2 = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/cafe-map-creating");
  };

  return (
    <div className="cafe-register">
      {/* 고정 헤더 */}
      <header className="register-fixed-header">
        <div className="header-content">
          <img src="/logo.png" alt="Bean Logo" className="header-logo" />
          <h1 className="header-text">Bean</h1>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
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
                업체명, 상세설명, 대표키워드 등 우리 가게 정보를 알려주세요.{" "}
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
            <div className="upload-box">
              <div className="upload-icon">
                <img src="/icons/upload-icon.png" alt="업로드 아이콘" />
              </div>
              <p>파일을 여기로 드래그하여 업로드하세요.</p>
              <p className="upload-hint">(파일 형식: PNG, JPG)</p>
              <button className="upload-btn">파일 선택</button>
            </div>

            <div className="file-list-section">
              <div className="file-item">
                <span className="file-name">cafe01.png</span>
                <span className="file-size">1487.2 KB</span>
                <button className="file-view-btn">파일 보기</button>
              </div>
              <div className="file-item">
                <span className="file-name">cafe01.png</span>
                <span className="file-size">1487.2 KB</span>
                <button className="file-view-btn">파일 보기</button>
              </div>
              <div className="file-item">
                <span className="file-name">cafe01.png</span>
                <span className="file-size">1487.2 KB</span>
                <button className="file-view-btn">파일 보기</button>
              </div>
              {/* 추가 파일 항목 반복 */}
              <button className="reset-btn">초기화하기</button>
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
