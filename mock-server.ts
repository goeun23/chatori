import express from "express";
import cors from "cors";
import logger from "pino-http";
import { createMiddleware } from "@mswjs/http-middleware";

import { handlers } from "./src/testing/mocks/handlers/index";
import { initalizeDB } from "./src/testing/mocks/db";

import { env } from "./src/config/env";

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(logger());
app.use(createMiddleware(...handlers));

initalizeDB().then(() => {
  console.log("DB initalizeDB", app);

  app.listen(env.API_MOCK_API_PORT, () => {
    console.log(`Mock API server is running on port ${env.API_MOCK_API_PORT}`);
  });
});
