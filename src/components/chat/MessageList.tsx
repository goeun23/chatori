import React, {useEffect, useRef} from "react";
import { useChatStore } from "@/stores";

const MessageList = () => {
    const messages = useChatStore((state)=> state.messages);
    const messageEndRef = useRef<HTMLDivElement>(null);

    // 새 메세지가 추가될 때 자동으로 스크롤
    useEffect(()=> {
        messageEndRef.current?.scrollIntoView({behavior : 'smooth'});
    }, [messages]);

    return (
        <div className="flex flex-col gap-2 overflow-y-auto h-64 border p-2">
            {messages.map((message:string) => (
                <div 
                    key={message.id} 
                    className={`p-2 rounded ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                    {message.text}
                </div>
            ))}
            <div ref={messageEndRef} />
        </div>
    )
}
export default MessageList;

// 메세지 목록을 zustand에서 가져와 화면에 렌더링
// 새 메세지가 추가될때 자동 스크롤 기능 적용용