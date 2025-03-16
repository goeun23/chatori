import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { getChatHistory } from "@/feature/api/chat";

// 채팅 응답 타입 정의
interface ChatResponse {
  success: boolean;
  data: Array<{
    seq: string;
    title: string;
  }>;
  total: number;
}

// 채팅방 타입 정의
interface ChatRoom {
  id: string | number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
}

// 채팅 목록 컴포넌트
export const ChatHistory = () => {
  const [activeChat, setActiveChat] = useState("챗돌이");
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([
    {
      id: 1,
      name: "챗돌이",
      lastMessage: "무엇을 도와드릴까요?",
      time: "지금",
      unread: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API에서 채팅 기록 가져오기
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setLoading(true);
        const response = await getChatHistory();
        console.log("API 응답:", response);

        // API 응답 구조 확인
        const responseData = response as unknown as ChatResponse;

        if (responseData.success && responseData.data) {
          // API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
          const formattedChats = responseData.data.map((chat, index) => ({
            id: chat.seq || index + 1,
            name: chat.title || `채팅 ${index + 1}`,
            lastMessage: "새로운 대화를 시작하세요",
            time: "방금",
            unread: 0,
          }));

          setChatRooms(formattedChats);
        }
      } catch (err) {
        console.error("채팅 기록 가져오기 오류:", err);
        setError("채팅 기록을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="대화방 검색"
            className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">{error}</div>
        ) : chatRooms.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            대화방이 없습니다.
          </div>
        ) : (
          chatRooms.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 border-b hover:bg-gray-100 cursor-pointer ${
                activeChat === chat.name ? "bg-blue-50" : ""
              }`}
              onClick={() => setActiveChat(chat.name)}
            >
              <div className="flex justify-between items-start">
                <div className="font-medium">{chat.name}</div>
                <div className="text-xs text-gray-500">{chat.time}</div>
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="text-sm text-gray-600 truncate w-40">
                  {chat.lastMessage}
                </div>
                {chat.unread > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 border-t">
        <Button color="light" className="w-full">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          새 대화 시작
        </Button>
      </div>
    </div>
  );
};
