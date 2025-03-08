import axios from "axios";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // .env에 저장
import {GoogleGenerativeAI} from "@google/generative-ai";
export const fetchChatbotResponse = async (messages: { role: string; content: string }[]) => {
    // API 키가 없는 경우 임시 응답 반환
    if (!API_KEY) {
      console.warn("API 키가 설정되지 않았습니다. 임시 응답을 반환합니다.");
      return "API 키가 설정되지 않아 응답할 수 없습니다. 환경 변수를 확인해주세요.";
    }
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = messages[messages.length - 1].content;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return text;
    } catch (error) {
        console.error("Gemini API 호출 실패:", error);
        // 오류 발생 시 임시 응답 반환
        return "죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.";
    }
};

export const saveChatHistory = async (messages: any) => {
  localStorage.setItem("chat_history", JSON.stringify(messages));
}

export const loadChatHistory = async () => {
  const storedMessages = localStorage.getItem("chat_history");
  return storedMessages ? JSON.parse(storedMessages) : [];
}


