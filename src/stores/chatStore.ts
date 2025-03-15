// 챗봇 대화 상태 관리
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// 훅을 직접 호출하지 않도록 import 제거
// import { useSaveChatHitory } from '../hooks/useChatQuery';

interface Message {
  id: string | number;

  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface ChatState {
  messages: Message[];
  isBotTyping: boolean;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setIsBotTyping: (isTyping: boolean) => void;
}

// 로컬 스토리지 초기화 (문제 해결을 위해)
localStorage.removeItem('chat-storage');
localStorage.removeItem('chat_history');

// persist 미들웨어를 사용하여 로컬 스토리지에 상태 저장
export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isBotTyping: false,
      addMessage: (role, content) =>
        set((state) => {
          const updatedMessages = [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              role,
              content,
              timestamp: new Date(),
            },
          ];
          return { messages: updatedMessages };
        }),

      setIsBotTyping: (isTyping: boolean) =>
        set({
          isBotTyping: isTyping,
        }),
    }),
    {
      name: 'chat-storage', // 로컬 스토리지 키 이름
    }
  )
);
