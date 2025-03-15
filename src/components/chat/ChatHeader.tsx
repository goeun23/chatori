import { GoogleLoginButton } from "@/components/ui/button";

export const ChatHeader = () => {
  return (
    <header className="bg-blue-600 text-white p-3 rounded-t-lg shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-xl font-bold">chatori</div>
      </div>
      <div>
        <GoogleLoginButton />
      </div>
    </header>
  );
};

