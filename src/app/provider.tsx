// 다양한 프로바이더 기능을 래핑하여 애플리케이션의 전역 설정을 관리하는 파일 
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // react-query를 사용하여 서버 상태 관리
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from "react-error-boundary"; // 앱에서 발생하는 에러를 잡아내고, 지정된 폴백 컴포넌트를 렌더링하여 에러처리
// ㄴ 애플리케이션의 메타 케그 관리 seo, meta 정보 
import { queryConfig } from '../lib/react-query';
import { MainErrorFallback } from '@/components/errors/main';
type AppProviderProps = {
    children : React.ReactNode;
}

export const AppProvider = ({children}:AppProviderProps) => {
    const [queryClient] = React.useState(()=> 
        new QueryClient({
            defaultOptions: queryConfig,
        })
    );

    return (
        <React.Suspense // 비동기 로딩 상태를 처리하기 위해 사용
            fallback = { // 로딩중일때 표시할 컴포넌트를 지정 
                <div className='flex h-screen w-screen'>
                    spinner ... 
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={MainErrorFallback}>
                    <QueryClientProvider client={queryClient}>
                        {import.meta.env.DEV && <ReactQueryDevtools/>}
                        {children}
                        {/* <Notifications/>
                        <AuthLoader
                            renderLoading = {()=> (
                                <div className='flee h-screen w-screen'>
                                    spinner2 ... 
                                </div>
                            )}
                        >
                            {children}
                        </AuthLoader> */}
                    </QueryClientProvider>
            </ErrorBoundary>
        </React.Suspense>
    )
}