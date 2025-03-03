// 챗봇 대화 상태 관리
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ChatState {

}

export const useChatStore = create<ChatState>()(
    persist(
        (set)=> ({
            // 챗봇 대화 상태
        }), 
        {
            name : 'chat-storage'
        })
)