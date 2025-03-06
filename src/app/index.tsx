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
import {ButtonLuna} from "@/components/ui/button" 

// google Provider 추가
import {GoogleLoginButton} from '@/components/ui/button'

import ChatContainer from '@/components/chat/ChatContainer';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient, 
  QueryClientProvider
} from '@tanstack/react-query'
import {getTodos, postTodo} from '../my-api'
const queryClient = new QueryClient();

import { useAuthStore } from '@/stores';
import { useLoadChatHistory } from '../hooks/useChatQuery';

export const App = () =>{
  const {isLogin, getUser} = useAuthStore();
  const user = getUser();
  useLoadChatHistory();
  const name:string = user;
  // const {name}:string = user; <- 잘못된 문법! 
  // ㄴ 오류 발생. 구조분해할당시 변수 자체에 타입을 지정하는 것이 아니라, user 객체의 타입을 지정해야한다.
  // ㄴ 이렇게 사용하려면 user 객체의 타입을 먼저 명시한 후 구조분해할당 사용 가능 
  // -> const user: {name:string, email:string} = {name : 'name', email: 'email'} 
  // -> const {name} = user;
  /**
   * 구조분해할당하면서 타입을 지정하기
   * const user = {name : 'name', email : 'email'};
   * const {name} : {name:string} = user;
   */
  let loginButton;

  if(isLogin){
    loginButton = <div><h5>hi, {name}!</h5><span>로그아웃</span></div>;
  }else{
    // <GoogleLoginButton isLogin={isLogin} /> <- hook을 직접 전달하려고 했음
    // hook으로 해당 값을 전달하지말고, 컴포넌트에 직접 작성하고, 모든 로직을 그 안에서 처리해야한다. 
    // -> 컴포넌트 내부에서 hook을 사용하고, hook을 통해 상태를 변경하고, 상태에 따라 컴포넌트를 렌더링한다.
    // zustand 에서는 상태가 변경되면 이를 직접 감지하기 때문에 vue-watch 같은걸 쓸 필요가 없다. 
    //loginButton = <GoogleLoginButton isLogin/>
  }

  return (
    <>
      <GoogleLoginButton/>
      <QueryClientProvider client={queryClient}>
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <ChatContainer />
        </div>
      </QueryClientProvider>  
    </>
  )
}




/**
 * 전역 상태 관리 : appProvider와 그 허ㅏ위 컴포넌트들이 React Query를 통해 서버 관리를 쉽게 할 수 있음
 * 전역 에러 처리 : ErrorBoundary를 통해 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러 처리
 * 전역 메타태그 관리 : HelmetProvider를 통해 애플리케이션의 메타태그 관리를 할 수 있음
 * 전역 로딩 상태 관리 : React.Suspense를 통해 비동기 로딩 상태를 처리할 수 있음
 */