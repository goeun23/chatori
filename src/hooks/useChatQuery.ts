import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchChatbotResponse } from '@/services/chatService';
import { useChatStore } from '@/stores/chatStore';
import { loadChatHistory, saveChatHistory } from '../services/chatService';

import { useAuthStore } from '@/stores/authStore';

// 대화내역불러오기
export const useLoadChatHistory = () => {
  const addMessage = useChatStore((state: any) => state.addMessage);
  const isLogin = useAuthStore((state: any) => state.isLogin);
  console.log(isLogin);
  return useQuery({
    queryKey: ['chatHistory'], // 쿼리 키
    queryFn: async () => {
      // 실제 데이터를 가져오는 함수
      try {
        // 로그인한 사용자만 데이터를 가져오도록 함
        let messages = [];
        if (!isLogin) {
          messages = [];
        } else {
          messages = await loadChatHistory();
        }

        // 상태 업데이트 로직
        if (Array.isArray(messages) && messages.length > 0) {
          // 기존 메시지를 모두 지우고 새로 추가하는 대신,
          // 메시지가 없을 때만 추가하도록 수정
          const currentMessages = useChatStore.getState().messages;
          if (currentMessages.length === 0) {
            messages.forEach((msg: any) => {
              if (msg.role && msg.content) {
                addMessage(msg.role, msg.content);
              }
            });
          }
        }
        return messages;
      } catch (error) {
        console.error('채팅 기록 로딩 실패:', error);
        return [];
      }
    },
    staleTime: 100 * 60 * 5, // 5분동안 캐싱 유지
    retry: false, // 실패 시 재시도 안함
  });
};

// 대화내역저장하기
export const useSaveChatHitory = () => {
  return useMutation({
    mutationFn: (messages: any) => saveChatHistory(messages),
  });
};

export const useChatQuery = () => {
  const addMessage = useChatStore((state: any) => state.addMessage);
  const setIsBotTyping = useChatStore((state: any) => state.setIsBotTyping);

  return useMutation({
    mutationFn: fetchChatbotResponse,
    onMutate: () => {
      setIsBotTyping(true);
    },
    onSuccess: (data) => {
      addMessage('assistant', data);
      setIsBotTyping(false);
    },
    onError: (error) => {
      console.error('챗봇 응답 실패:', error);
      setIsBotTyping(false);
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
