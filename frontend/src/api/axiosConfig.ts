import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const apiConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  } as RawAxiosRequestHeaders,
};
