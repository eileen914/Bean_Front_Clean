// - 일정 시간 후 자동 화면 전환, 헤더, 로딩 스피너, 안내 텍스트 등으로 구성
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createFloorPlan, createChair, createTable } from "../apis/api"; // API 호출 함수 임포트
import "./CafeMapCreating.css";
const CafeMapCreating = () => {
  // ===== 라우터 이동 =====
  const navigate = useNavigate();
  const location = useLocation();
  const { cafeId, floorPlanComplete } = location.state || {};
  const [floorPlanResult, setFloorPlanResult] = useState(null);
  const [detections, setDetections] = useState([]);
  const [floorPlanId, setFloorPlanId] = useState(null);
  const [complete, setComplete] = useState(false);

  const getFirstClass = (className) => {
    if (typeof className !== "string") return "";
    return className.split("-")[0];
  };

  useEffect(() => {
    console.log("Floor plan complete:", floorPlanComplete);
    setFloorPlanResult(floorPlanComplete);
  }, []);
  // 페이지 진입 후 5초 뒤 자동으로 등록 완료 페이지로 이동
  useEffect(() => {
    // floorPlanResult가 변경될 때마다 실행되는 로직
    const createFloorPlanAPI = async () => {
      if (!floorPlanResult) return; // 이미지가 없으면 실행하지 않음
      const width = floorPlanResult.image_size?.width;
      const height = floorPlanResult.image_size?.height;
      console.log(
        "Creating floor plan with dimensions:",
        width,
        height,
        cafeId
      );
      const data = await createFloorPlan({ width, height, cafe_id: cafeId });
      if (data.status === 201) {
        console.log("Floor plan created successfully:", data.data);
        setFloorPlanId(data.data.id);
        setDetections(floorPlanResult.detections);
      }
    };
    createFloorPlanAPI();
  }, [floorPlanResult]);
  useEffect(() => {
    // detections가 변경될 때마다 실행되는 로직
    const createChairAndTableAPI = async () => {
      if (!detections || detections.length === 0) return; // 탐지 결과가 없으면 실행하지 않음
      for (const detection of detections) {
        const { class: className, confidence, x, y, width, height } = detection;
        const firstClass = getFirstClass(className);

        if (firstClass === "chair" || firstClass === "sofa") {
          const chairRequest = {
            width: width,
            height: height,
            x_position: x,
            y_position: y,
            socket: false,
            window: false,
            occupied: false,
            floor_plan: floorPlanId,
          };

          const result = await createChair(chairRequest);

          if (result.status === 201) {
            console.log("Chair created successfully:", result.data);
          } else {
            console.error("Failed to create chair:", result);
          }
        } else if (firstClass === "table") {
          const tableRequest = {
            width: width,
            height: height,
            x_position: x,
            y_position: y,
            floor_plan: floorPlanId,
          };
          const result = await createTable(tableRequest);

          if (result.status === 201) {
            console.log("Table created successfully:", result.data);
          } else {
            console.error("Failed to create table:", result);
          }
        }
      }
      setComplete(true);
    };
    createChairAndTableAPI();
  }, [detections]);
  useEffect(() => {
    if (complete) {
      navigate("/cafe-map-created", { state: { cafeId, floorPlanId } });
    }
  }, [complete]);
  // 헤더 로고 클릭 시 랜딩 페이지로 이동
  const handleLogoClick = () => {
    navigate("/cafe-landing");
  };
  return (
    <main className="creating-page" role="main" aria-busy="true">
      {/* ===== 헤더 영역 ===== */}
      <header className="cafe-fixed-header">
        <div className="cafe-header-content">
          <img src="/logo.png" alt="Bean Logo" className="cafe-header-logo" />
          <h1 className="cafe-header-text" onClick={handleLogoClick}>
            Bean
          </h1>
        </div>
      </header>
      {/* ===== 메인 콘텐츠 영역 ===== */}
      <section className="creating-center">
        {/* 로딩 스피너 */}
        <div
          className="creating-spinner"
          aria-label="빈자리 배치도를 생성 중입니다"
        />
        {/* 안내 텍스트 */}
        <h1 className="creating-heading">
          우리 가게의 <strong>빈자리 배치도</strong>가<br />
          생성되고 있어요
        </h1>
        <p className="creating-sub">
          점주님이 올린 사진을 분석해 좌석 배치를 자동으로 만들고 있어요.
        </p>
      </section>
    </main>
  );
};
export default CafeMapCreating;
