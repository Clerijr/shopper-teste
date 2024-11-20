import { InvalidDataError, ServerError } from "./errors";
import { HttpResponse } from "./types";

export function badRequest(error: string): HttpResponse {
  return {
    statusCode: 400,
    body: new InvalidDataError(error),
  };
}

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
}
