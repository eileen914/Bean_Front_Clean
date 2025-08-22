import { instance, instanceWithToken } from "./axios";

/* -------------------- 에러 정규화 유틸 -------------------- */
const normalizeError = (error) => {
  if (error?.response) {
    const { status, data } = error.response;
    return {
      status,
      data,
      message:
        data?.detail || data?.message || error.message || "Request failed",
    };
  }
  return { status: 0, data: null, message: error?.message || "Network error" };
};

/* ---------------- 401 -> refresh -> 재시도 래퍼 ---------------- */
const withRefreshRetry = async (fnRequest) => {
  try {
    return await fnRequest();
  } catch (err) {
    const e = normalizeError(err);
    if (e.status !== 401) throw e;
    try {
      await instance.post("/owners/refresh/"); // 쿠키 기반 refresh
      return await fnRequest(); // 원 요청 재시도
    } catch (e2) {
      throw normalizeError(e2);
    }
  }
};

/* ==================== owner 관련 API ==================== */

/* 회원가입: 201 Created + 쿠키(set) + Owner 데이터 */
export const signUp = async (data) => {
  try {
    const res = await instance.post("/owners/signup/", data);
    return { status: res.status, data: res.data }; // 201 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 로그인: 200 OK + 쿠키(set) + Owner 데이터 */
export const signIn = async (data) => {
  try {
    const res = await instance.post("/owners/signin/", data);
    return { status: res.status, data: res.data };
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 로그아웃: 204 No Content + 쿠키 삭제 */
export const signOut = async () => {
  try {
    const res = await instance.post("/owners/signout/");
    return { status: res.status }; // 204 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 로그인 체크: 200이면 true, 401이면 refresh 후 재시도 */
export const checkLogin = async () => {
  try {
    const call = () => instanceWithToken.get("/owners/info/");
    const res = await withRefreshRetry(call);
    return res?.status === 200;
  } catch {
    return false;
  }
};

/* 내 정보: { id, username } */
export const getOwnerInfo = async () => {
  try {
    const call = () => instanceWithToken.get("/owners/info/");
    const res = await withRefreshRetry(call);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 특정 오너의 카페 목록: Cafe[] */
export const getOwnerCafes = async (ownerId) => {
  try {
    const res = await instance.get(`/owners/${ownerId}/cafes/`);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 카페 생성 */
export const createCafe = async (data) => {
  const call = () => instance.post("/cafes/", data);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data };
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 챗봇 질의 (백엔드에 엔드포인트 존재 시) */
export const getChatbot = async (question) => {
  try {
    const res = await instance.get("/cafes/chat/", { params: { question } });
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* ==================== floorplan 관련 API ==================== */

/* 목록 */
export const listFloorPlans = async () => {
  try {
    const res = await instance.get("/floorplans/");
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 생성: { width, height, cafe_id } */
export const createFloorPlan = async ({ width, height, cafe_id }) => {
  const call = () =>
    instanceWithToken.post("/floorplans/", { width, height, cafe_id });
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 201 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 상세 */
export const getFloorPlan = async (floorPlanId) => {
  try {
    const res = await instance.get(`/floorplans/${floorPlanId}/`);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 수정: { width?, height?, cafe? }  // 주의: 'cafe' (id), 'cafe_id' 아님 */
export const updateFloorPlan = async (floorPlanId, payload) => {
  const call = () =>
    instanceWithToken.put(`/floorplans/${floorPlanId}/`, payload);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 200 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 삭제 */
export const deleteFloorPlan = async (floorPlanId) => {
  const call = () => instanceWithToken.delete(`/floorplans/${floorPlanId}/`);
  try {
    const res = await withRefreshRetry(call);
    return res.status === 204;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 오너별 목록 */
export const listOwnerFloorPlans = async (ownerId) => {
  try {
    const res = await instance.get(`/floorplans/by-owner/${ownerId}/`);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 카페별 목록 */
export const listCafeFloorPlans = async (cafeId) => {
  try {
    const res = await instance.get(`/floorplans/by-cafe/${cafeId}/`);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 객체 탐지 업로드: form { image: File } */
export const uploadImageAndGetDetections = async (
  imageFile,
  { signal } = {}
) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await instance.post("/floorplans/detection/", formData, {
      // (gpt 조언) Content-Type을 지정하지 말 것: 브라우저가 boundary 포함해 자동 설정
      signal,
    });
    return res.data; // { image_size, detections[] }
  } catch (err) {
    throw normalizeError(err);
  }
};

/* ==================== chair 관련 API ==================== */

/* 목록 */
export const listChairs = async () => {
  try {
    const res = await instance.get("/chairs/");
    return res.data; // [{ id, x, y, width, height, type }, ...]
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 조회 */
export const getChair = async (chairId) => {
  try {
    const res = await instance.get(`/chairs/${chairId}/`);
    return res.data; // { id, x, y, width, height, type }
  } catch (err) {
    throw normalizeError(err);
  }
}

/* 생성 */
export const createChair = async (chairData) => {
  const call = () => instanceWithToken.post("/chairs/", chairData);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 201 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 수정 */
export const updateChair = async (chairId, chairData) => {
  const call = () => instanceWithToken.put(`/chairs/${chairId}/`, chairData);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 200 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 삭제 */
export const deleteChair = async (chairId) => {
  const call = () => instanceWithToken.delete(`/chairs/${chairId}/`);
  try {
    const res = await withRefreshRetry(call);
    return res.status === 204;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* ==================== table 관련 API ==================== */

/* 목록 */
export const listTables = async () => {
  try {
    const res = await instance.get("/tables/");
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 생성 */
export const createTable = async (tableData) => {
  const call = () => instanceWithToken.post("/tables/", tableData);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 201 기대
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 상세 */
export const getTable = async (tableId) => {
  try {
    const res = await instance.get(`/tables/${tableId}/`);
    return res.data;
  } catch (err) {
    throw normalizeError(err);
  }
};

/* 수정 */
export const updateTable = async (tableId, tableData) => {
  const call = () => instanceWithToken.put(`/tables/${tableId}/`, tableData);
  try {
    const res = await withRefreshRetry(call);
    return { status: res.status, data: res.data }; // 200 기대
  } catch (err) {
    throw normalizeError(err);
  }
};
