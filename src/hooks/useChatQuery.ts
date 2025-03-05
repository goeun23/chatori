import { useMutation } from "@tanstack/react-query";
import { fetchChatbotResponse } from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";

export const useChatQuery = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  return useMutation({
    mutationFn: fetchChatbotResponse, // ✅ 올바른 문법 (mutationFn 명확히 지정)
    onSuccess: (data) => {
      addMessage("assistant", data); // ✅ 챗봇 응답 추가
    },
    onError: (error) => {
      console.error("챗봇 응답 실패:", error);
    },
  });
};

/**
 * 
 * 
 * 
 * import { useMutation } from "@tanstack/react-query";
import { fetchChatbotResponse } from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";

export const useChatQuery = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  return useMutation({
    mutationFn: fetchChatbotResponse, // ✅ 올바른 문법 (mutationFn 명확히 지정)
    onSuccess: (data) => {
      addMessage("assistant", data); // ✅ 챗봇 응답 추가
    },
    onError: (error) => {
      console.error("챗봇 응답 실패:", error);
    },
  });
};
 */