import { Response } from "express";
import { IClient } from "../interfaces";

export const responseWithDelay = (
  res: Response,
  code: number,
  data: string | IClient[],
  delay: number
) => {
  setTimeout(() => {
    res.status(code).send({ statusCode: code, data });
  }, delay);
};
