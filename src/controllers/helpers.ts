import { ServerError } from "./errors";
import { HttpResponse } from "./types";

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      message: error,
    },
  };
}

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
}
