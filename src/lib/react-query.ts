import { UseMutationOptions, DefaultOptions } from "@tanstack/react-query";

export const queryConfig ={
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60,
    }
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...ars:any) => Promise<any>> = 
Awaited<ReturnType<FnType>>;

// Omit : 객체 타입을 변형할 떄 사용하는 유틸리티 타입
// 기존 객체에서 일부 속성을 없애거나, 선택적으로 만들때 사용
export type QueryConfig<T extends (...args:any[]) => any> = Omit<
    ReturnType<T>, 
    'queryKey' | 'queryFn'
>;

export type MutationConfig<
MutationFnType extends (...args:any)=> Promise<any>, 
> = UseMutationOptions<
ApiFnReturnType<MutationFnType>, 
    Error,
    Parameters<MutationFnType>[0]
>

