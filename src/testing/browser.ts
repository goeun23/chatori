import { setupWorker } from "msw/browser";

// 올바른 경로로 수정
import { handlers } from "./mocks/handlers/index";

// 브라우저 환경에서 MSW 워커 설정
export const worker = setupWorker(...handlers);

// 디버깅을 위한 로그 추가 (MSW 버전에 맞게 수정)
worker.events.on("request:start", ({ request }) => {
  console.log("MSW 요청 감지:", request.method, request.url);
});

worker.events.on("response:mocked", ({ request, response }) => {
  console.log("MSW 응답 생성:", request.method, request.url, response.status);
});

// unhandled:request 이벤트가 지원되지 않는 경우 제거
// worker.events.on("unhandled:request", ({ request }) => {
//   console.warn("MSW 처리되지 않은 요청:", request.method, request.url);
// });
