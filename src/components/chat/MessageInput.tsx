import React, {useState} from "react";
import { useChatStore } from "@/stores";
import { Button } from "flowbite-react";
import { useChatQuery } from "@/hooks/useChatQuery";
import { HiPaperAirplane, HiPhotograph, HiEmojiHappy, HiPaperClip } from "react-icons/hi";

const MessageInput = () => {
    const [input, setInput] = useState('');
    // input은 현재 상태, setInput은 상태를 업데이트하는 함수
    const addMessage = useChatStore((state) => state.addMessage);
    const isBotTyping = useChatStore((state) => state.isBotTyping);
    const chatMutation = useChatQuery();

    const handleSend = () => {
        if(!input.trim() || isBotTyping){
            return;
        }

        // 사용자 메세지 추가
        addMessage('user', input);
    chatMutation.mutate([{ role: 'user', content: input }]);
        setInput(''); // 상태 업데이트
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <Button color="light" size="xs" pill>
                    <HiPhotograph className="h-4 w-4" />
                </Button>
                <Button color="light" size="xs" pill>
                    <HiEmojiHappy className="h-4 w-4" />
                </Button>
                <Button color="light" size="xs" pill>
                    <HiPaperClip className="h-4 w-4" />
                </Button>
            </div>
            
            <div className="flex items-center gap-2">
                <textarea
          data-testid="message-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="메시지를 입력하세요! (Shift+Enter로 줄바꿈)"
                    disabled={isBotTyping}
                    rows={2}
                />
        <Button onClick={handleSend} disabled={!input.trim() || isBotTyping} color="blue" pill>
                    <HiPaperAirplane className="h-5 w-5" />
                </Button>
            </div>
            
      <div className="text-xs text-gray-500 mt-1">Enter 키를 눌러 전송, Shift+Enter로 줄바꿈</div>
        </div>
    );
};

