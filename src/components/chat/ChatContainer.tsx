import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";



const ChatContainer = () => {
    return (
        <div>
            <div className="flex flex-col w-full max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
                <div className="flex-grow overflow-auto">
                    <MessageList />
                </div>
                <div className="p-4">
                    <MessageInput />
                </div>
            </div>
        </div>
    )
}


export default ChatContainer;