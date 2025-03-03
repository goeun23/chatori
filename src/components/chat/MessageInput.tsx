import React, {useState} from "react";
import { useChatStore } from "@/stores";
import {Button} from "flowbite-react";
const MessageInput = () => {
    const [input, setInput] = useState('');
    const addMessage = useChatStore((state) => state.addMessage);

    const handleSend = () => {
        if(input.trim()){
            addMessage("user", input);
            setInput('');
        }

        // 더미 챗봇 응답 추가(api 호출 대신)
        setTimeout(()=> {
            addMessage("bot", "안녕하세요! 무엇을 도와드릴까요?");
        }, 1000)
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