import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
//const {setUser, logout} = useAuthStore(); 컴포넌트 밖에서 호출하면 안된다.
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
import { useAuthStore } from '@/stores'; // 포함된 함수는 반드시 내부에서 호출
export const GoogleLoginButton = ({}: {}) => {
  // 반드시 컴포넌트 내부에서 호출해야한다.
  const { setUser, logout, isLogin, getUser } = useAuthStore();

  const onLoginSuccess = (crenditalResponse: any) => {
    const jwt_token = crenditalResponse.credential;
    const decodedUserInfo: any = jwtDecode(jwt_token);

    const { name, email } = decodedUserInfo;
    setUser({ name, email }, jwt_token);
  };

  const onLoginError = () => {
    console.log('Login Error');
    alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
  };

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  const name: string = getUser()?.name;

  const renderedLoginButton = isLogin ? (
    <div data-testid="user-profile">
      <h4 data-testid="user-greeting">hi, {name}!</h4>
      <button data-testid="logout-button" onClick={() => handleLogout()}>
        로그아웃
      </button>
    </div>
  ) : (
    <div data-testid="google-login-wrapper">
      <GoogleLogin
        data-testid="google-login-button"
        onSuccess={onLoginSuccess}
        onError={onLoginError}
      />
    </div>
  );

  return (
    <div data-testid="auth-container">
      <button data-testid="temp-login-button">임시로그인버튼튼</button>
      <div data-testid="google-login-container">
        <GoogleOAuthProvider data-testid="google-login-container" clientId={CLIENT_ID}>
          {renderedLoginButton}
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

//export * from './google-login-button';
