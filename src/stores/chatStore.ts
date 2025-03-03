// 챗봇 대화 상태 관리
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface Message {
    id: number;
    sender : "user" | "bot";
    text :string;
}


interface ChatState {
    messages : Message[];
    addMessage : (sender:"user" | "bot", text:string)=> void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages : [], 
  addMessage: (sender, text) =>
    set((state) => ({
      messages: [...state.messages, { id: crypto.randomUUID(), sender, text }],
    })),
}))