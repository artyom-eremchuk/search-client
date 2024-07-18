import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { IClient } from "./interfaces";
import { ClientService } from "./services/ClientService";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Express = express();
app.use(cors<Request>());
app.use(express.json());

app.post("/api/clients", (req: Request, res: Response) => {
  const { email, number } = req.body as IClient;
  const clientService = new ClientService(res);

  if (!email) {
    return clientService.badRequestException();
  }

  if (email && number) {
    return clientService.findOne(email, number);
  }

  return clientService.findByEmail(email);
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
