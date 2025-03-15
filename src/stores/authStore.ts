// 로그인 상태 관리

import { create } from 'zustand';

import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLogin: boolean;
  token: string | null;
  setUser: (user: User, token: string) => void;
  getUser: () => User | null;
  logout: () => void;
}

// local storage에 저장하여 새로고침해도 로그인 상태 유지
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLogin: false,
      setUser: (user, token) => set({ user, token, isLogin: true }), // 로그인 상태 업데이트
      getUser: () => get().user,
      getIsLogin: () => get().isLogin,
      logout: () => set({ user: null, token: null, isLogin: false }), // 로그아웃시 상태 초기화
    }),

    {
      name: 'auth-storage', // local storage에 저장될 이름
    }
  )
);

// persist를 사용하지않으면 페이지를 새로고침하면 데이터가 사라진다.
// 그런데 반드시 로컬에 저장하지않고, 휘발되어도 되는 데이터를 저장할 경우
/**
 * 미들웨어인 persist를 사용하지않고 데이터를 저장한다.
 * 예를 들면 UI 상태(모달 알림 여부, 다크모드 상태 등)
 * 아니면, 검색 필터, 정렬기준(즉, 사용자가 페이지 이동하면 초기화해도 되는 데이터)
 * 입력중인 폼 데이터(임시 저장이 필요 없을 때)
 * 네트워크 요청 중 상태(로딩중 여부)
 */

/**
 * 미들웨어인 persist를 사용해야하는 경우(새로고침해도 유지되어야하는 데이터)
 * 로그인상태
 * 다크모드 설정(사용자가 브라우절르 껏다 켜도 유지해야 하는 경우)
 * 사용자 기본 설정(언어설정, 테마, 최근 본 항목 등)
 * 장바구니, 찜목록(사용자가 로그인 상태에서도 유지해야 하는 데이터)
 * 사용자가 작성중인 글, 댓글(사용자가 로그인 상태에서도 유지해야 하는 데이터)
 * 네트워크 요청 결과(캐시된 데이터)
 * 불필요한 데이터까지 저장하면 브라우저 저장 공간을 차지할 수 있음.
 */

/**
 * 휘발되어도 되는 데이터는 미들웨어 없이 사용하고, 유지해야할 데이터는 persist를 사용
 * 즉, 미들웨어 persist는 반드시 필요한 경우에만 적용하는 것이 좋다.
 */
