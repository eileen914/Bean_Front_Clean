// 카페 등록 1단계 페이지
// - 서비스 소개, 혜택 안내, 등록 버튼 등으로 구성

import "./CafeRegister1.css";
import { useNavigate } from "react-router-dom";

const CafeRegister1 = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // 등록 버튼 클릭 시 다음 단계로 이동
  const handleNextClick = () => {
    navigate("/cafe-register-2");
  };

  // 헤더 로고 클릭 시 홈으로 이동
  const handleLogoClick = () => {
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
      <div className="cafe-register-container">
        <div className="register-main">
          {/* 서비스 소개 영역 */}
          <section className="register-hero">
            <h2 className="register-title">
              카페 점주를 위한 빈자리 관리 서비스
            </h2>
            <p className="register-subtitle">
              손쉽게 카페 좌석을 관리하고 고객에게 실시간 정보를 제공하세요
            </p>
          </section>
          {/* 서비스 주요 기능 안내 영역 */}
          <section className="register-features">
            {/* 손쉬운 좌석 관리 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img
                  src="/icons/seat-icon.png"
                  alt="좌석 관리"
                  className="feature-icon"
                />
              </div>
              <div className="feature-text">
                <strong>손쉬운 좌석 관리</strong>
                <p>
                  카페의 좌석 배치도를 쉽게 만들고 실시간으로 관리할 수
                  있습니다.
                </p>
              </div>
            </div>

            {/* 위치 기반 서비스 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img
                  src="/icons/location-icon.png"
                  alt="위치 기반"
                  className="feature-icon"
                />
              </div>
              <div className="feature-text">
                <strong>위치 기반 서비스</strong>
                <p>
                  고객들이 주변 카페의 빈자리 정보를 쉽게 확인할 수 있습니다.
                </p>
              </div>
            </div>

            {/* 실시간 업데이트 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img
                  src="/icons/update-icon.png"
                  alt="실시간 업데이트"
                  className="feature-icon"
                />
              </div>
              <div className="feature-text">
                <strong>실시간 업데이트</strong>
                <p>
                  좌석 상태를 실시간으로 업데이트하여 정확한 정보를 제공합니다.
                </p>
              </div>
            </div>

            {/* 고객 유지 증가 */}
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <img
                  src="/icons/customer-icon.png"
                  alt="위치 기반"
                  className="feature-icon"
                />
              </div>
              <div className="feature-text">
                <strong>고객 유지 증가</strong>
                <p>빈자리 정보를 통해 더 많은 고객을 유치할 수 있습니다.</p>
              </div>
            </div>
          </section>

          {/* 서비스 혜택 안내 영역 */}
          <section className="register-benefits">
            <h3 className="benefits-title">카페 점주를 위한 특별 혜택</h3>
            <div className="benefit-block">
              <ul>
                <li>무료 카페 배치도 생성</li>
              </ul>
            </div>
            <div className="benefit-block">
              <ul>
                <li>손쉬운 좌석 관리 시스템</li>
              </ul>
            </div>
            <div className="benefit-block">
              <ul>
                <li>고객 데이터 분석 및 인사이트</li>
              </ul>
            </div>
            <div className="benefit-block">
              <ul>
                <li>광고 및 프로모션 기회</li>
              </ul>
            </div>
          </section>

          {/* 등록 버튼 영역 */}
          <div className="register-footer">
            <button className="register-button" onClick={handleNextClick}>
              업체 등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeRegister1;
