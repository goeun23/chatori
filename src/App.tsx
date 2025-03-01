import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "flowbite-react";
import {ButtonLuna} from "@/components/ui/button" 


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
    <Button>Click me</Button>;
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
    <ButtonLuna variant="outline" size="icon" className="overflow-hidden rounded-full">
      <span className='sr-only'>Open user menu</span>
      
    </ButtonLuna>
    <QueryClientProvider client={queryClient}>
     
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-500">Tailwind 정상 동작!</h1>
        <p className="mt-2 text-lg text-gray-700">이 문장이 스타일이 적용된다면 성공!</p>
      </div>
      
    </QueryClientProvider>
    <div>
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
export default App
