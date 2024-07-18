export interface IClient {
  email: string;
  number?: string;
}

export interface IResponseType {
  statusCode: number;
  data: string | IClient[];
}
