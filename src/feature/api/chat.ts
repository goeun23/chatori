import { api } from "@/lib/api-client";

export const getChatHistory = () => {
  //return api.get("/ghchat/history");
  return api.get("/api/v1/chat/history");
};
