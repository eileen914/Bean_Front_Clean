// 업체 등록 완료 페이지
// - 성공 애니메이션, 기능 안내, 이동 버튼 등으로 구성

import { useNavigate } from "react-router-dom";
import "./CafeMapCreated.css";
const CafeMapCreated = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();
  const location = useLocation();
  const { cafeId, floorPlanId } = location.state || {};

  // 빈자리 관리 페이지로 이동
  const handleDashboardClick = () => {
    navigate("/cafe-update", { state: { cafeId, floorPlanId } });
  };
  // 랜딩 페이지로 이동
  const handleBackToLanding = () => {
    navigate("/cafe-landing");
  };
  return (
    <div className="cafe-map-created">
      <div className="created-container">
        <div className="created-content">
          {/* ===== 성공 애니메이션 영역 ===== */}
          <div className="success-animation">
            <div className="success-icon">
              <div className="checkmark">✓</div>
            </div>
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
          </div>
          {/* ===== 안내 텍스트 영역 ===== */}
          <h1 className="created-title">업체 등록 완료!</h1>
          <p className="created-description">
            축하합니다! 업체가 성공적으로 등록되었습니다.
            <br />
            이제 Bean의 모든 기능을 이용하실 수 있습니다.
          </p>
          {/* ===== 기능 안내 영역 ===== */}
          <div className="created-details">
            {/* 지도 등록 안내 */}
            <div className="detail-item">
              <div className="detail-icon">
                <img
                  src="/icons/map-icon.png"
                  alt="지도 등록"
                  className="feature-icon"
                />
              </div>
              <div className="detail-text">
                <h3>지도 등록 완료</h3>
                <p>업체 위치가 지도에 정상적으로 등록되었습니다</p>
              </div>
            </div>
            {/* 정보 저장 안내 */}
            <div className="detail-item">
              <div className="detail-icon">
                <img
                  src="/icons/list-icon.png"
                  alt="정보 저장"
                  className="feature-icon"
                />
              </div>
              <div className="detail-text">
                <h3>업체 정보 저장</h3>
                <p>입력하신 모든 정보가 안전하게 저장되었습니다</p>
              </div>
            </div>
            {/* 서비스 이용 안내 */}
            <div className="detail-item">
              <div className="detail-icon">
                <img
                  src="/icons/success-icon.png"
                  alt="서비스 이용가능"
                  className="feature-icon"
                />
              </div>
              <div className="detail-text">
                <h3>서비스 이용 가능</h3>
                <p>주문 관리, 재고 관리 등 모든 기능을 이용하세요</p>
              </div>
            </div>
          </div>
          {/* ===== 이동 버튼 영역 ===== */}
          <div className="created-actions">
            {/* 랜딩 페이지로으로 이동 버튼 */}
            <button
              className="landing-btn secondary-btn"
              onClick={handleBackToLanding}
            >
              홈으로 돌아가기
            </button>
            {/* 빈자리 관리 페이지로 이동 버튼 */}
            <button
              className="dashboard-btn primary-btn"
              onClick={handleDashboardClick}
            >
              빈자리 보러가기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CafeMapCreated;
