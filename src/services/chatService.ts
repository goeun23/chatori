import axios from "axios";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // .env에 저장
import {GoogleGenerativeAI} from "@google/generative-ai";
export const fetchChatbotResponse = async (messages: { role: string; content: string }[]) => {
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
        throw error;
      }
};

export const saveChatHistory = async (messages: any) => {
  localStorage.setItem("chat_history", JSON.stringify(messages));
}

export const loadChatHistory = async () => {
  const storedMessages = localStorage.getItem("chat_history");
  return storedMessages ? JSON.parse(storedMessages) : [];
}


