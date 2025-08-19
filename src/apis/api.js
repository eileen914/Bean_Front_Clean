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

export const getUser = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
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
