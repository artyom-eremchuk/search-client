import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
app.use(cors<Request>());
app.use(express.json());

app.post("/api/clients", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Express + TypeScript Server");
});

app.listen(5000, () => {
  console.log(`[server]: Server is running at http://localhost:5000`);
});
