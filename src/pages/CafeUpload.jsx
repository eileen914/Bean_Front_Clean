// 카페 도면(배치도) 업로드 페이지
// - 매장 도면 이미지 업로드, drag & drop, 파일 리스트, 배치도 생성 등 UI 구성
// - 백엔드로부터 props로 받을 수 있는 정보:
//   1. 업로드된 도면 이미지 정보: { imageUrl, imageSize, ... }
//   2. 테이블/좌석 감지 결과: [{ tableId, x, y, width, height, ... }]
//   3. 업로드 상태 및 에러 메시지
// props 예시: CafeUpload({ floorPlan, detections, uploadStatus, ... }

import React, { useEffect, useRef, useState } from "react";
import "./CafeRegister2.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
  uploadImageAndGetDetections,
  getLoginInfo,
  getOwnerCafes,
} from "../apis/api"; // API 호출 함수 임포트

const CafeUpload = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  const location = useLocation();
  const [cafeId, setCafeId] = useState(location.state?.cafeId);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [floorPlanComplete, setFloorPlanComplete] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);

  // 다음 단계로 이동
  const handleNextClick = () => {
    console.log(cafeId, floorPlanComplete);
    navigate("/cafe-map-creating", { state: { cafeId, floorPlanComplete } });
  };

  // 헤더 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };

  // 파일 input 변경 시 파일 추가
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  // drag & drop으로 파일 추가
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...droppedFiles]);
  };

  // drag over 시 기본 동작 방지
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 파일 리스트 초기화
  const handleReset = () => {
    setUploadedFiles([]);
  };

  // 파일 업로드 시 도면 이미지 및 감지 결과 API 호출
  useEffect(() => {
    const getCafeInfo = async () => {
      const result = await getLoginInfo();

      const owner = result.data;
      const cafes = await getOwnerCafes(owner.id);
      setCafeId(cafes[0]?.id);
    };
    getCafeInfo();
  }, []);

  useEffect(() => {
    const getFloorPlanAPI = async () => {
      if (uploadedFiles.length === 0) return; // 배열이 비어 있으면 실행하지 않음
      console.log(uploadedFiles.length, "개의 파일이 업로드되었습니다.");
      const data = await uploadImageAndGetDetections(
        uploadedFiles[uploadedFiles.length - 1]
      );
      console.log("업로드된 파일의 탐지 결과:", data);
      setFloorPlanComplete(data);
      setIsUploaded(true);
    };
    getFloorPlanAPI();
  }, [uploadedFiles]);

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
        <h2 className="register2-title">빈자리 배치도 만들기</h2>

        {/* ===== 매장 도면 업로드 영역 ===== */}
        <section className="register2-step">
          <div className="register2-step-header-wrapper">
            <div className="register2-step-header">
              <div className="step-label-box">
                <span>매장 사진 업로드하기</span>
              </div>
              <div className="step-header-text">
                테이블 및 좌석 정보를 알 수 있는 매장 도면 사진을
                업로드해주세요.
              </div>
            </div>
          </div>

          {/* 파일 업로드 및 drag & drop 영역 */}
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

            {/* 업로드된 파일 리스트 영역 */}
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

        {/* ===== 배치도 생성 버튼 영역 ===== */}
        <div className="register2-footer">
          {isUploaded ? (
            <button className="register-button" onClick={handleNextClick}>
              배치도 생성
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CafeUpload;

// 여기 참고: https://as-you-say.tistory.com/380

// 백엔드 연동 시 다음 부분을 서버로 전달하도록 수정 필요:
// 1. uploadedFiles 상태를 서버로 POST 요청으로 전송
// 2. 파일 업로드를 위한 API endpoint (예: /api/upload) 구현 및 axios 또는 fetch 사용
// 3. drag & drop 또는 input 변경 시 서버와 실시간 연동이 필요하다면 업로드 직후 handleFileChange 안에서 서버 호출
