import { GoogleLoginButton } from "@/components/ui/button/google-login/google-login";

export const GoogleLoginContainer = () => {
  return (
    <div className="w-full text-center" data-testid="login-container">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          안녕하세요!
        </h2>
        <p className="text-gray-600">
          챗톨톨이입니다.
          <br />
          구글 계정으로 로그인해주세요.
        </p>
      </div>

      <div className="flex justify-center" data-testid="google-login-wrapper">
        <GoogleLoginButton />
      </div>
    </div>
  );
};
