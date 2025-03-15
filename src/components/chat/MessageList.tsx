import React, { useEffect, useRef } from 'react';
import { useChatStore } from '@/stores';
import { Spinner } from 'flowbite-react';

const MessageList = () => {
  const messages = useChatStore((state) => state.messages);
  const isBotTyping = useChatStore((state) => state.isBotTyping);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // 새 메세지가 추가될 때 자동으로 스크롤
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // 메시지 그룹화 (날짜별)
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: any[] }[] = [];

    if (messages.length === 0) return groups;

    // 실제 메시지가 없는 경우 샘플 메시지 추가
    const messagesToUse =
      messages.length > 0
        ? messages
        : [
            {
              id: 1,
              role: 'assistant',
              content: '안녕하세요! 무엇을 도와드릴까요?',
              timestamp: new Date(),
            },
            { id: 2, role: 'user', content: '안녕하세요! 반가워요.', timestamp: new Date() },
            {
              id: 3,
              role: 'assistant',
              content: '오늘 무엇을 도와드릴까요?',
              timestamp: new Date(),
            },
          ];

    let currentDate = new Date(messagesToUse[0].timestamp || new Date()).toDateString();
    let currentGroup: any[] = [];

    messagesToUse.forEach((message) => {
      const messageDate = new Date(message.timestamp || new Date()).toDateString();

      if (messageDate !== currentDate) {
        groups.push({
          date: currentDate,
          messages: currentGroup,
        });
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });

    groups.push({
      date: currentDate,
      messages: currentGroup,
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="flex flex-col gap-4">
      {messages.length === 0 && messageGroups.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <p>로그인 후 대화 기록이 저장됩니다.</p>
        </div>
      )}

      {messageGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="message-group">
          <div className="text-center my-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
              {new Date(group.date).toLocaleDateString()}
            </span>
          </div>

          {group.messages.map((message, messageIndex) => (
            <div
              key={message.id || messageIndex}
              className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex ${
                  message.role !== 'user' ? 'flex-row' : 'flex-row-reverse'
                } items-start max-w-[80%]`}
              >
                {message.role !== 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1">
                    C
                  </div>
                )}
                <div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {formatDate(new Date(message.timestamp || new Date()))}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold ml-2 mt-1">
                    U
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}

      {isBotTyping && (
        <div className="flex justify-start mb-4">
          <div className="flex flex-row items-start">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1">
              C
            </div>
            <div className="p-3 rounded-lg bg-white text-gray-800 rounded-bl-none border border-gray-200">
              <div className="flex items-center">
                <Spinner size="sm" className="mr-2" />
                <span className="text-sm">입력 중...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageList;

// 메세지 목록을 zustand에서 가져와 화면에 렌더링
// 새 메세지가 추가될때 자동 스크롤 기능 적용용
