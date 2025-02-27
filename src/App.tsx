import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "flowbite-react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient, 
  QueryClientProvider
} from '@tanstack/react-query'
import {getTodos, postTodo} from '../my-api'
const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">Tailwind 정상 동작!</h1>
        <p className="mt-2 text-lg text-gray-700">이 문장이 스타일이 적용된다면 성공!</p>
      </div>
      <Todos />
    </QueryClientProvider>
    <div>
      <Button gradientDuoTone="purpleToBlue" className="mt-4">
        Flowbite 버튼 테스트
      </Button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
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
      mutationFn : postTodo, 
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
export default App
