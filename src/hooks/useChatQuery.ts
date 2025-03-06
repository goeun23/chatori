import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchChatbotResponse } from "@/services/chatService";
import { useChatStore } from "@/stores/chatStore";
import { loadChatHistory, saveChatHistory } from "../services/chatService";

// 대화내역불러오기
export const useLoadChatHistory = () => {
  const addMessage = useChatStore((state)=> state.addMessage);
  return useQuery({
    queryKey : ["chatHistory"], 
    queryFn : async () => {
      const messages = await loadChatHistory();
      messages.forEach((msg)=> addMessage(msg.role, msg.content));
      return messages;
    }, 
    staleTime : 100* 60 *5 , // 5분동안 캐싱 유지지
  })
}

// 대화내역저장하기
export const useSaveChatHitory = () => {
  return useMutation({
    mutationFn:saveChatHistory,
  })
}




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