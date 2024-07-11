import createServer from "next";
import express from "express";
import { Response, Request } from "express";
import { typeError } from "../src/lib/handlers/handlersErrors";
const fs = require("fs");
const path = require("path");

export type validSubTables = "chars" | "classes" | "races" | "creats";
export const validTableObj = new Set<validSubTables>([
  "chars",
  "classes",
  "races",
  "creats",
]);

export function resConnectMySql(connection: any): number {
  return connection.connect((err: Error): number => {
    try {
      if (err) {
        //incluir casos de error
        switch (err.message) {
          default:
            throw new Error(`Error stablishing connection with database`);
        }
      } else return 1;
    } catch (eR) {
      console.log(`Error connecting to database: ${(eR as Error).message}`);
      return -1;
    }
  });
}

export async function resConnectNext(server: any): Promise<number> {
  try {
    const nextApp = createServer({
      dev: process.env.NODE_ENV !== "production",
    });
    nextApp.prepare().then(() => {
      server.use((req: Request, res: Response) => {
        nextApp.getRequestHandler()(req, res);
      });
      const serverexp = server.listen(process.env.PORT || 3000, () => {
        console.log(serverexp);
      });
    });
    return 1;
  } catch (eL) {
    console.error(`Error setting listening to port: ${(eL as Error).message}`);
    return -1;
  }
}

const database = require("mysql");
const pool = database.createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
const server = express();
try {
  const connectStatusMySql = resConnectMySql(pool);
  if (connectStatusMySql < 0)
    throw new Error(`Error connecting to the database`);
  const connectStatusNext = await resConnectNext(server);
  if (connectStatusNext < 0)
    throw new Error(`Error connection to Next.js server`);
  server.post("/submit-form", (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({ message: "Form submitted with success." });
    res.status(404).json({ message: "Error submiting form data." });
  });
  server.get("/request-form", (req: Request, res: Response) => {
    console.log(req);
    res.status(200).json({ message: "Form data successfully fetched." });
    res.status(404).json({ message: "Error getting form data." });
  });
  server.get("/characters", (req: Request, res: Response) => {
    console.log(req);
    const { table } = req.params;
    try {
      if (!validTableObj.has(table as validSubTables))
        throw typeError(
          table,
          `validating request table`,
          Array.from(validTableObj)
        );
      pool.query(`SELECT * FROM ${table}`, (eQ: Error, res: Response) => {
        return eQ
          ? res.status(500).json({ error: eQ.message })
          : res.status(200).json({ [table]: res });
      });
    } catch (eT) {
      console.error(
        `Error manipulating GET request:\n${(eT as Error).message}`
      );
    }
    res.status(200).json({ message: "Success on getting entities data." });
    res.status(404).json({ message: "Error getting entities data." });
  });
  server.get("/classes"),
    (res: Response) => {
      const dirPath = path.join(
        __dirname,
        "C:/Users/Aron/Desktop/P/JS/app-jogo-semnome/login-page/public/img/classes"
      );
      fs.readdir(dirPath, (err: Error, files: string[]) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(files);
      });
    };
} catch (eC) {
  console.error(`Error connecting to servers: ${(eC as Error).message}`);
}
