// 상태관리 라이브러리를 사용하는 테스트 환경을 설정하는 역할 
// 주로 테스트중에 상태를 초기화하고, 각 테스트 후에 상태를 리셋하는 기능을 제공
import {act} from '@testing-library/react';
import {afterEach, vi} from 'vitest';
import * as zustand from 'zustand';

// zustand 라이브러리의 실제 구현을 가져온다.
const {create : actualCreate, createStore  : actualCreateStore} = await vi.importActual<typeof zustand>('zustand');

// 상태 리셋 함수 저장소
export const storeResetFns = new Set<()=> void>();

// 스토어 생성 함수 래핑
const createUncurried = <T>(stateCreator:zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator)
    const initialState = store.getInitialState();
    storeResetFns.add(()=> {
        store.setState(initialState, true);
    })
    return store;
}

// 커리드 버전 지원
export const create = (<T>(stateCreator: zustand.StateCreator<T>)=> {
    return typeof stateCreator === 'function'
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof zustand.create;

// createStore 함수 래핑
const createStoreUncurried = <T>(stateCreator:zustand.StateCreator<T>)=> {
    const store = actualCreateStore(stateCreator);
    const initialState = store.getInitialState();
    storeResetFns.add(()=> {
        store.setState(initialState, true);
    })
    return store;
}

// 커리드 버전 지원원
export const createStore = (<T>(stateCreator : zustand.StateCreator<T>)=> {
    return typeof stateCreator === 'function' 
    ? createStoreUncurried(stateCreator)
    : createStoreUncurried;
}) as typeof zustand.createStore;


// 각 테스트 후 상태 리셋셋
afterEach(()=> {
    act(()=> {
        storeResetFns.forEach((resetFn)=> {
            resetFn();
        })
    })
})