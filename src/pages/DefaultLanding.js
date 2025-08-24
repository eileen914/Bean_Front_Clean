// 서비스 첫 진입(랜딩) 페이지
// - 이용자/점주 선택, 헤더/메인 UI, 라우팅 등

import { useNavigate } from "react-router-dom";
import "./DefaultLanding.css";

const DefaultLanding = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();

  // 점주 버튼 클릭 시 점주 랜딩으로 이동
  const handleCafeOwnerClick = () => {
    navigate("/cafe-landing");
  };

  // 이용자 버튼 클릭 시 이용자 랜딩으로 이동
  const handleCustomerClick = () => {
    navigate("/user-landing");
  };

  return (
    <div className="default-landing">
      <div className="landing-container">
        {/* ===== 상단 헤더 영역 ===== */}
        <header className="landing-header">
          <div className="header-buttons">
            {/* 이용자/점주 선택 버튼 */}
            <button
              className="header-btn customer-btn"
              onClick={handleCustomerClick}
            >
              카페를 찾는 이용자입니다
            </button>
            <button
              className="header-btn owner-btn"
              onClick={handleCafeOwnerClick}
            >
              카페를 운영하는 점주입니다
            </button>
          </div>
        </header>

        {/* ===== 메인 콘텐츠 영역 ===== */}
        <main className="landing-main">
          {/* 서비스 로고 영역 */}
          <div className="logo-area">
            <h1 className="main-logo">BEAN</h1>
            <img src="/logo.png" alt="Bean Logo" className="bean-logo" />
          </div>

          {/* 카페 인테리어 이미지 영역 */}
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

export default DefaultLanding;
