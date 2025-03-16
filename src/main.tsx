import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";

// MSW 모킹 활성화
import { enableMocking } from "./testing";

async function main() {
  // 모킹 활성화 (환경 변수에 따라 조건부로 활성화됨)
  await enableMocking();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

main();
