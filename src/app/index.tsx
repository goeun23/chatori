import "../App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { AppProvider } from "./provider";
import { AppRouter } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <div className="bg-gray-100 min-h-screen">
          <AppProvider>
            <AppRouter />
          </AppProvider>
        </div>
      </QueryClientProvider>
    </Suspense>
  );
};

/**
 * 전역 상태 관리 : appProvider와 그 허ㅏ위 컴포넌트들이 React Query를 통해 서버 관리를 쉽게 할 수 있음
 * 전역 에러 처리 : ErrorBoundary를 통해 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러 처리
 * 전역 메타태그 관리 : HelmetProvider를 통해 애플리케이션의 메타태그 관리를 할 수 있음
 * 전역 로딩 상태 관리 : React.Suspense를 통해 비동기 로딩 상태를 처리할 수 있음
 */
