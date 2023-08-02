import axios, { AxiosError, AxiosResponse, CancelToken } from "axios";

import { IError } from "../types";

interface IErrorResponse {
  message: string;
}

const Request = axios.create({
  baseURL: process.env.REACT_APP_API_BACKEND,
  headers: { "Content-Type": "application/json" },
});

const serializeError = (error: AxiosError<IErrorResponse>): IError => {
  const se = {} as IError;
  const { response } = error;
  if (!response) throw error;
  const { status, statusText, data } = response;
  const { message } = data;
  se.name = "API ERROR";
  let errorMsg = "";
  try {
    errorMsg = JSON.parse(message).error.debug_msg;
  } catch (e) {
    errorMsg = message;
  }
  se.message = errorMsg || statusText || `API FAILED (${status})`;
  se.code = status.toString();
  se.stack = JSON.stringify(error.toJSON());
  se.data = data;
  return se;
};

const onErrorInterceptor = (error: AxiosError<IErrorResponse>): IError => {
  throw serializeError(error);
};

Request.interceptors.response.use(undefined, onErrorInterceptor);

const extractor = <T>(response: AxiosResponse<T>) => {
  const { status, data, statusText } = response;
  if (status !== 200) throw new Error(statusText);
  return data;
};

export const Get = <T>(
  path: string,
  params?: Partial<Record<string, string | number>>,
  cancelToken?: CancelToken
): Promise<T> => Request.get<T>(path, { params, cancelToken }).then(extractor);

export const Post = <T>(
  path: string,
  payload: unknown,
  cancelToken?: CancelToken
): Promise<T> =>
  Request.post<T>(path, payload, { cancelToken }).then(extractor);

export const Put = <T>(
  path: string,
  payload: unknown,
  cancelToken?: CancelToken
): Promise<T> => Request.put<T>(path, payload, { cancelToken }).then(extractor);
