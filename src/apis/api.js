import { instance, instanceWithToken } from "./axios";

export const getChatbot = async (question) => {
  const response = await instance.get("/cafes/chat/", {
    params: { question },
  });
  return response.data;
};
