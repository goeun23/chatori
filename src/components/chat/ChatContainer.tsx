import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/stores";
import { Button } from "flowbite-react";
import { HiDotsVertical, HiPhone, HiVideoCamera, HiInformationCircle } from "react-icons/hi";

const ChatContainer = () => {
    const isBotTyping = useChatStore((state) => state.isBotTyping);
    
    return (
        <div className="h-full flex flex-col">
            {/* 채팅방 헤더 */}
            <div className="p-3 border-b flex justify-between items-center bg-white">
                <div className="flex items-center">
                    <div className="relative mr-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            C
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${isBotTyping ? 'bg-yellow-500' : 'bg-green-500'} border-2 border-white`}></span>
                    </div>
                    <div>
                        <h5 className="font-bold">챗돌이</h5>
                        <p className="text-xs text-gray-500">
                            {isBotTyping ? "입력 중..." : "온라인"}
                        </p>
                    </div>
                </div>
                
            </div>
            
            {/* 채팅 내용 */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <MessageList />
            </div>
            
            {/* 입력 영역 */}
            <div className="p-3 border-t bg-white">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatContainer;