import { IClient } from "../interfaces";
import { Response } from "express";
import database from "../database";

export class ClientService {
  constructor(
    private res: Response,
    private readonly db: IClient[] = database
  ) {}

  private tranformNumber = (number: string) => {
    if (!number.length) {
      return number;
    }

    return number.replace(/-/g, "");
  };

  private responseWithDelay = (
    res: Response,
    statusCode: number,
    data: string | IClient | IClient[],
    delay: number
  ) => {
    setTimeout(() => {
      res.status(statusCode).send({ statusCode, data });
    }, delay);
  };

  findOne(email: string, number: string) {
    const tranformedNumber = this.tranformNumber(number);

    const client = this.db.filter(
      (client) => client.email === email && client.number === tranformedNumber
    );

    if (!client.length) {
      return this.responseWithDelay(this.res, 404, "Client Not Found", 5000);
    }

    return this.responseWithDelay(this.res, 200, client, 5000);
  }

  findByEmail(email: string) {
    const clients = this.db.filter((client) => client.email === email);

    if (!clients.length) {
      return this.responseWithDelay(this.res, 404, "Client Not Found", 5000);
    }

    return this.responseWithDelay(this.res, 200, clients, 5000);
  }

  badRequestException() {
    return this.responseWithDelay(this.res, 400, "Bad Request", 5000);
  }
}
