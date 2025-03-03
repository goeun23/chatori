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

export const App = () =>{
  const [count, setCount] = useState(0)
  const {isLogin, getUser} = useAuthStore();
  const user = getUser();
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
    {/* {loginButton} */}
    
    <ButtonLuna
      variant="outline"
      icon = {
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Github Repo
    </ButtonLuna>
    <ChatContainer/>
    <QueryClientProvider client={queryClient}>
     
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">Tailwind 정상 동작!</h1>
        <p className="mt-2 text-lg text-gray-700">이 문장이 스타일이 적용된다면 성공!</p>
      </div>
      
    </QueryClientProvider>
    <div>
              
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
function Todos(){
    const queryClient = useQueryClient()

    const {query} = useQuery({
      queryKey : ['todos'], 
      queryFn: ()=> Promise.resolve(5), 
      select: (data)=> data.toString(), 
    })

    const mutation = useMutation({
      mutationFn : ()=> {}, 
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey : ['todos']})
      }
    })

    return (
      <div>
        <ul>{query.data?.map((todo)=> <li key={todo.id}>{todo.title}</li>)}</ul>
      

      <button
        onClick={()=> {
          mutation.mutate({
            id : Date.now(), 
            title : 'Do Laundry'
          })
        }}
      >
        Add Todo
      </button>
      </div>
    )
  }
//export default App




/**
 * 전역 상태 관리 : appProvider와 그 허ㅏ위 컴포넌트들이 React Query를 통해 서버 관리를 쉽게 할 수 있음
 * 전역 에러 처리 : ErrorBoundary를 통해 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러 처리
 * 전역 메타태그 관리 : HelmetProvider를 통해 애플리케이션의 메타태그 관리를 할 수 있음
 * 전역 로딩 상태 관리 : React.Suspense를 통해 비동기 로딩 상태를 처리할 수 있음
 */