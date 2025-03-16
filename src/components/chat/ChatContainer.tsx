import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import { MessageInput } from "@/components/chat";
import { useChatStore } from "@/stores";
import { HiChevronDown } from "react-icons/hi";

export const ChatContainer = () => {
  const isBotTyping = useChatStore((state) => state.isBotTyping);
  const messages = useChatStore((state) => state.messages);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치에 따라 헤더 표시/숨김 및 스크롤 버튼 표시/숨김 처리
  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

    // 스크롤이 일정 거리 이상 올라가면 스크롤 버튼 표시
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);

    // 스크롤 방향에 따라 헤더 표시/숨김
    if (scrollTop > lastScrollTop && scrollTop > 50) {
      setIsHeaderVisible(false); // 아래로 스크롤 시 헤더 숨김
    } else {
      setIsHeaderVisible(true); // 위로 스크롤 시 헤더 표시
    }

    setLastScrollTop(scrollTop);
  };

  // 스크롤 버튼 클릭 시 맨 아래로 스크롤
  const scrollToBottom = () => {
    if (!chatContainerRef.current) return;
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // 새 메시지가 추가될 때 자동 스크롤
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages.length, isBotTyping, showScrollButton]);

  return (
    <div className="h-full flex flex-col">
      {/* 채팅방 헤더 - 스크롤에 따라 숨김/표시 */}
      {isHeaderVisible && (
        <div className="p-3 border-b flex justify-between items-center bg-white sticky top-0 z-10 transition-transform duration-300">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                C
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  isBotTyping ? "bg-yellow-500" : "bg-green-500"
                } border-2 border-white`}
              ></span>
            </div>
            <div>
              <h5 className="font-bold">챗돌이</h5>
              <p className="text-xs text-gray-500">
                {isBotTyping ? "입력 중..." : "온라인"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 채팅 내용 */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-50 scroll-smooth"
        onScroll={handleScroll}
      >
        <MessageList />

        {/* 스크롤 버튼 */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
            aria-label="맨 아래로 스크롤"
          >
            <HiChevronDown className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="p-3 border-t bg-white">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
