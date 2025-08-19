import { instance, instanceWithToken } from "./axios";

export const signUp = async (data) => {
  const response = await instance.post("/owners/signup/", data);
  if (response.status === 200 || response.status === 201) {
    //window.location.href = "/cafe-signin";
  } else {
    console.log("Error");
  }
  return response;
};

export const signIn = async (data) => {
  const response = await instance.post("/owners/signin/", data);
  if (response.status === 200) {
    //window.location.reload(); // 페이지 새로고침
  } else {
    console.log("Error");
  }
};

export const signOut = async (data) => {
  const response = await instance.post("/owners/signout/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("Error");
  }
};

export const checkLogin = async () => {
  try {
    const response = await instanceWithToken.get("/account/info/");
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const createCafe = async (data) => {
  const response = await instanceWithToken.post("/cafes/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    //navigate("/");
  } else {
    console.log("[ERROR] error while creating post");
  }
};

import { instance, instanceWithToken } from "./axios";

export const getChatbot = async (question) => {
  const response = await instance.get("/cafes/chat/", {
    params: { question },
  });
  return response.data;
};

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
