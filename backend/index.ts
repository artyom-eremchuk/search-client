import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db";
import { responseWithDelay } from "./utils";
import { IClient } from "./interfaces";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();
app.use(cors<Request>());
app.use(express.json());

app.post("/api/clients", (req: Request, res: Response) => {
  const { email } = req.body as IClient;

  if (!email) {
    responseWithDelay(res, 400, "Bad Request", 5000);
  }

  const clients = db.filter((client) => client.email === email);

  if (!clients.length) {
    responseWithDelay(res, 404, "Client Not Found", 5000);
  }

  if (Array.isArray(clients) && clients.length) {
    responseWithDelay(res, 200, clients, 5000);
  }
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
