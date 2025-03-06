// 챗봇 대화 상태 관리
import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import { useSaveChatHitory } from '../hooks/useChatQuery';

interface Message {
    id: number;
    sender : "user" | "assistant";
    content :string;
}


interface ChatState {
    messages : Message[];
    addMessage : (sender:"user" | "assistant", text:string)=> void;
}

export const useChatStore = create<ChatState>((set) => {
  const saveChat = useSaveChatHitory(); // 대화 내역 저장 훅
  
  return{
    messages : [], 
    addMessage: (role, content) =>
      set((state) => {
        const updatedMessages = [...state.messages, {id:crypto.randomUUID(), role, content }]
        saveChat.mutate(updatedMessages) // 새로운 메세지 저장
        return {messages:updatedMessages};
      }),
  }
  
});