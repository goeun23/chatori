import { HttpResponse, http } from "msw";

import { env } from "@/config/env";

import { db, persistDB } from "../db";
//import {networkDelay, requireAuth, sanitizeUser} from '../utils';

type CreateCommentBody = {
  body: string;
  dississioId: string;
};

export const chatHandlers = [
  http.get("/api/v1/chat/history", async ({ request }) => {
    //await networkDelay();
    try {
      console.log("모킹 핸들러: 채팅 기록 요청 처리 중");

      // 모든 채팅 데이터 가져오기
      const chats = db.chat.getAll();
      console.log("모킹 DB에서 가져온 채팅 데이터:", chats);

      // 채팅 데이터가 없으면 샘플 데이터 생성
      if (chats.length === 0) {
        console.log("채팅 데이터가 없어 샘플 데이터 생성");

        // 샘플 데이터 생성 (배열 형태로 여러 개 생성)
        const sampleChats = [
          db.chat.create({
            title: "첫 번째 샘플 채팅",
          }),
          db.chat.create({
            title: "두 번째 샘플 채팅",
          }),
          db.chat.create({
            title: "세 번째 샘플 채팅",
          }),
        ];

        // DB에 저장
        await persistDB("chat");

        // 직접 JSON 객체 생성하여 반환
        return new HttpResponse(
          JSON.stringify({
            success: true,
            data: sampleChats,
            total: sampleChats.length,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // 직접 JSON 객체 생성하여 반환
      return new HttpResponse(
        JSON.stringify({
          success: true,
          data: chats,
          total: chats.length,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("채팅 기록 가져오기 오류:", error);

      // 오류 응답도 직접 JSON 객체 생성
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Failed to fetch chat history",
          error: String(error),
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }),
];
