import { Button } from "flowbite-react";
import { useState } from "react";

// 채팅 목록 컴포넌트
export const ChatHistory = () => {
  const [activeChat, setActiveChat] = useState("챗돌이");

  const chatRooms = [
    {
      id: 1,
      name: "챗돌이",
      lastMessage: "무엇을 도와드릴까요?",
      time: "지금",
      unread: 0,
    },
    {
      id: 2,
      name: "개인 메모",
      lastMessage: "여기에 메모를 저장할 수 있어요",
      time: "어제",
      unread: 2,
    },
    {
      id: 3,
      name: "코딩 도우미",
      lastMessage: "코드 작성을 도와드립니다",
      time: "2일 전",
      unread: 0,
    },
    {
      id: 4,
      name: "영어 선생님",
      lastMessage: "How can I help you today?",
      time: "1주일 전",
      unread: 0,
    },
  ];

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
        {chatRooms.map((chat) => (
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
        ))}
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
