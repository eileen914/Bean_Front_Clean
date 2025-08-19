import { instance, instanceWithToken } from "./axios";

// floorplan 관련 API
export const listFloorPlans = async () => {
  // floorplan 목록 요청
  const response = await instance.get("/floorplans/");
  return response.data;
};

export const createFloorPlan = async (floorPlanData) => {
  // floorplan 생성 요청
  const response = await instanceWithToken.post("/floorplans/", floorPlanData);

  if (response.status === 201) {
    console.log("Floor Plan Created:", response.data);
  } else {
    console.error("Create Floor Plan Error:", response.data);
  }
};

export const getFloorPlan = async (floorPlanId) => {
  // 특정 floorplan 정보 요청
  const response = await instance.get(`/floorplans/${floorPlanId}/`);
  return response.data;
};

export const updateFloorPlan = async (floorPlanId, floorPlanData) => {
  // floorplan 업데이트 요청
  const response = await instanceWithToken.put(
    `/floorplans/${floorPlanId}/`,
    floorPlanData
  );

  if (response.status === 200) {
    console.log("Floor Plan Updated:", response.data);
  } else {
    console.error("Update Floor Plan Error:", response.data);
  }
};

export const deleteFloorPlan = async (floorPlanId) => {
  // floorplan 삭제 요청
  const response = await instanceWithToken.delete(
    `/floorplans/${floorPlanId}/`
  );

  if (response.status === 204) {
    console.log("Floor Plan Deleted");
    return true;
  }
  return false;
};

export const listOwnerFloorPlans = async (ownerId) => {
  // 특정 업체의 floorplan 목록 요청
  const response = await instance.get(`/owners/${ownerId}/floorplans/`);
  return response.data;
};

export const listCafeFloorPlans = async (cafeId) => {
  const response = await instance.get(`/cafes/${cafeId}/floorplans/`);
  return response.data;
};

export const uploadImageAndGetDetections = async (imageFile) => {
  const controller = new AbortController();
  try {
    // FormData 객체 생성
    const formData = new FormData();
    formData.append("image", imageFile);

    // API 호출
    const response = await instance.post("/floorplans/detection/", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 추가 헤더 설정
      },
      signal: controller.signal,
    });

    // 응답 데이터 처리
    const data = response.data;
    console.log("Image Size:", data.image_size);
    console.log("Detections:", data.detections);

    return data;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// owner 관련 API
export const signUp = async (userData) => {
  try {
    // 회원가입 요청
    const response = await instance.post("/signup/", userData);

    if (response.status === 201) {
      console.log("Sign Up Successful:", response.data);
    }
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("Sign Up Error:", error.response?.data || error.message);
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    // 로그인 요청
    const response = await instance.post("/signin/", credentials);

    if (response.status === 200) {
      console.log("Sign In Successful:", response.data);
    }
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error("Sign In Error:", error.response?.data || error.message);
    throw error;
  }
};

export const signOut = async () => {
  const response = await instanceWithToken.post("/signout/");
  if (response.status === 204) {
    console.log("Sign Out Successful");
    return true;
  }
  return false;
};

export const getOwnerInfo = async () => {
  try {
    // 업체 정보 요청
    const response = await instanceWithToken.get("/owners/info/");

    if (response.status === 200) {
      console.log("Owner Info Retrieved:", response.data);
    }
    return response.data;
  } catch (error) {
    // 에러 처리
    console.error(
      "Get Owner Info Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getOwnerCafes = async (ownerId) => {
  const response = await instanceWithToken.get(`/owners/${ownerId}/cafes/`);
  return response.data;
};

// chair 관련 API

// table 관련 API
