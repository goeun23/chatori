import { Card } from "flowbite-react";
import { useAuthStore } from "@/stores";
import { GoogleLoginContainer } from "@/components/auth/GoogleLoginContainer";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";

const AuthLayout = () => {
  const { isLogin } = useAuthStore();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <Card className="max-w-md mx-auto">
          {/* 헤더 컴포넌트 */}
          <AuthHeader />

          {/* 메인 컨텐츠 */}
          <div className="flex flex-col items-center space-y-6 p-6">
            <GoogleLoginContainer />
          </div>

          {/* 푸터 컴포넌트 */}
          <AuthFooter />
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
