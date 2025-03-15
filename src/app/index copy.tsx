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



/**
 * 전역 상태 관리 : appProvider와 그 허ㅏ위 컴포넌트들이 React Query를 통해 서버 관리를 쉽게 할 수 있음
 * 전역 에러 처리 : ErrorBoundary를 통해 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러 처리
 * 전역 메타태그 관리 : HelmetProvider를 통해 애플리케이션의 메타태그 관리를 할 수 있음
 * 전역 로딩 상태 관리 : React.Suspense를 통해 비동기 로딩 상태를 처리할 수 있음
 */