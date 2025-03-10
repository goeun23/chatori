// import { AppProvider } from './provider'; // 모든 컴포넌트가 appProvider가 제공하는 기능과 설정을 제공받음
// import {AppRouter} from './router';

// export const App = () => {
//     return (
//         <AppProvider>
//             <AppRouter />
//         </AppProvider>
//     )
// }

import { useState } from 'react'
import '../App.css'
import { Button } from "flowbite-react";
import {GoogleLoginButton} from '@/components/ui/button'
import ChatContainer from '@/components/chat/ChatContainer';
import {QueryClient,   QueryClientProvider} from '@tanstack/react-query'

import { useLoadChatHistory } from '../hooks/useChatQuery';
import { Suspense } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-100 min-h-screen">
          <MessengerLayout />
        </div>
      </QueryClientProvider>
    </Suspense>
  )
}

const MessengerLayout = () => {
  useLoadChatHistory();
  
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-3 rounded-t-lg shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-bold">chatori</div>
        </div>
        <div>
          <GoogleLoginButton />
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden bg-white rounded-b-lg shadow-md">
        <div className="w-1/4 border-r border-gray-200 bg-gray-50">
          <ChatList />
        </div>
        <div className="w-3/4">
          <ChatContainer />
        </div>
      </div>
    </div>
  )
}

// 채팅 목록 컴포넌트
const ChatList = () => {
  const [activeChat, setActiveChat] = useState('챗돌이');
  
  const chatRooms = [
    { id: 1, name: '챗돌이', lastMessage: '무엇을 도와드릴까요?', time: '지금', unread: 0 },
    { id: 2, name: '개인 메모', lastMessage: '여기에 메모를 저장할 수 있어요', time: '어제', unread: 2 },
    { id: 3, name: '코딩 도우미', lastMessage: '코드 작성을 도와드립니다', time: '2일 전', unread: 0 },
    { id: 4, name: '영어 선생님', lastMessage: 'How can I help you today?', time: '1주일 전', unread: 0 },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <input 
            type="text" 
            placeholder="대화방 검색" 
            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {chatRooms.map(chat => (
          <div 
            key={chat.id}
            className={`p-3 border-b hover:bg-gray-100 cursor-pointer ${activeChat === chat.name ? 'bg-blue-50' : ''}`}
            onClick={() => setActiveChat(chat.name)}
          >
            <div className="flex justify-between items-start">
              <div className="font-medium">{chat.name}</div>
              <div className="text-xs text-gray-500">{chat.time}</div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-gray-600 truncate w-40">{chat.lastMessage}</div>
              {chat.unread > 0 && (
                <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t">
        <Button color="light" className="w-full">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          새 대화 시작
        </Button>
      </div>
    </div>
  );
};

/**
 * 전역 상태 관리 : appProvider와 그 허ㅏ위 컴포넌트들이 React Query를 통해 서버 관리를 쉽게 할 수 있음
 * 전역 에러 처리 : ErrorBoundary를 통해 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러 처리
 * 전역 메타태그 관리 : HelmetProvider를 통해 애플리케이션의 메타태그 관리를 할 수 있음
 * 전역 로딩 상태 관리 : React.Suspense를 통해 비동기 로딩 상태를 처리할 수 있음
 */