import { HttpResponse, http } from "msw";

import { env } from "@/config/env";

//import { networkDelay } from "../utils";

import { authHandlers } from "./auth";
import { chatHandlers } from "./chat";
import { userHandlers } from "./user";

export const handlers = [
  //...authHandler,
  ...chatHandlers,
  //...userHandlers,
  http.get("/healthcheck", async () => {
    //  await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];
