import { env } from "@/config/env";

export const enableMocking = async () => {
  if (env.ENABLED_API_MOCKING) {
    const { worker } = await import("./browser");
    const { initalizeDB } = await import("./db");
    await initalizeDB();
    return worker.start();
  }
};
