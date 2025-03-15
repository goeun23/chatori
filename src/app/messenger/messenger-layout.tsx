import { GoogleLoginButton } from "@/components/ui/button";
import { useLoadChatHistory } from "@/hooks/useChatQuery";
import { ChatHistory, ChatHeader, ChatContainer } from "@/components/chat";

const MessengerLayout = () => {
  useLoadChatHistory();

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <ChatHeader />

      <div className="flex-1 flex overflow-hidden bg-white rounded-b-lg shadow-md">
        <div className="w-1/4 border-r border-gray-200 bg-gray-50">
          <ChatHistory />
        </div>
        <div className="w-3/4">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default MessengerLayout;
