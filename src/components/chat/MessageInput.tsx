import React, {useState} from "react";
import { useChatStore } from "@/stores";
import {Button} from "flowbite-react";
import { useChatQuery } from "@/hooks/useChatQuery";
const MessageInput = () => {
    const [input, setInput] = useState('');
    const addMessage = useChatStore((state) => state.addMessage);
    const chatMutation = useChatQuery();

    const handleSend = () => {
        if(!input.trim()){
            return;
            
        }

        // 사용자 메세지 추가
        addMessage('user', input);

        chatMutation.mutate([{ role: "user", content: input }]);

        setInput('');
    };


    return (
        <div className="flex gap-2 mt-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="border p-2 flex-1 rounded-lg"
                placeholder="메시지를 입력하세요."
            />
            <Button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded">보내기</Button>
        </div>
    )
}

export default MessageInput;