// 챗봇 대화 상태 관리
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
// 훅을 직접 호출하지 않도록 import 제거
// import { useSaveChatHitory } from '../hooks/useChatQuery';

interface Message {
    id: string | number;
    
    role: "user" | "assistant";
    content: string;
}

interface ChatState {
    messages: Message[];
    isBotTyping:boolean;
    addMessage: (role: "user" | "assistant", content: string) => void;
    setIsBotTyping:(isTyping:boolean)=> void;
}

// persist 미들웨어를 사용하여 로컬 스토리지에 상태 저장
export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (role, content) =>
        set((state) => {
          const updatedMessages = [...state.messages, {id: crypto.randomUUID(), role, content}];
          // 훅 호출 대신 로컬 스토리지에 직접 저장
          localStorage.setItem("chat_history", JSON.stringify(updatedMessages));
          return {messages: updatedMessages};
        }),
      
      setIsBotTyping: (isTyping:boolean) => set({
          isBotTyping :isTyping, 
        })
    }),
    
    {
      name: 'chat-storage', // 로컬 스토리지 키 이름
    }
  )
);