// 챗봇 대화 상태 관리
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface Message {
    id: number;
    sender : "user" | "assistant";
    content :string;
}


interface ChatState {
    messages : Message[];
    addMessage : (sender:"user" | "assistant", text:string)=> void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages : [], 
  addMessage: (role, content) =>
    set((state) => ({
      messages: [...state.messages, { id: crypto.randomUUID(), role, content }],
    })),
}))