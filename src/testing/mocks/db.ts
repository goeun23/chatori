import { factory, primaryKey } from "@mswjs/data";
import { nanoid } from "nanoid";
import { LocalStorage } from "node-localstorage";

const models = {
  chat: {
    seq: primaryKey(nanoid),
    title: String,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;
const dbFilePath = "mocked-db.json";

export const loadDB = async () => {
  // If we are running in a Node.js environment
  if (typeof window === "undefined") {
    const { readFile, writeFile } = await import("fs/promises");
    try {
      const data = await readFile(dbFilePath, "utf8");
      console.log("Loading DB data:", data);

      // 빈 문자열이나 유효하지 않은 JSON인 경우 처리
      if (!data || data.trim() === "") {
        const emptyDB = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
        return emptyDB;
      }

      try {
        return JSON.parse(data);
      } catch (parseError) {
        console.error("JSON 파싱 오류:", parseError);
        // 파싱 오류 시 빈 객체 반환 및 파일 재생성
        const emptyDB = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
        return emptyDB;
      }
    } catch (error: any) {
      if (error?.code === "ENOENT") {
        const emptyDB = {};
        await writeFile(dbFilePath, JSON.stringify(emptyDB, null, 2));
        return emptyDB;
      } else {
        console.error("Error loading mocked DB:", error);
        return {};
      }
    }
  }

  // 브라우저 환경에서는 빈 객체 반환
  return {};
};

export const storeDB = async (data: string) => {
  // If we are running in a Node.js environment
  if (typeof window === "undefined") {
    const { writeFile } = await import("fs/promises");
    await writeFile(dbFilePath, data);
  }
};

export const persistDB = async (model: Model) => {
  if (process.env.NODE_ENV === "test") return;

  const data = await loadDB();
  data[model] = db[model].getAll();
  await storeDB(JSON.stringify(data));
};

export const initalizeDB = async () => {
  const database = await loadDB();

  console.log(database);
  debugger;

  Object.entries(db).forEach(([key, model]) => {
    const dataEntries = database[key];
    console.log(dataEntries);
    if (dataEntries) {
      dataEntries?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

export const resetDB = () => {
  window.localStorage.clear();
};
