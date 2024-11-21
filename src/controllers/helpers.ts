import { InvalidDataError, ServerError } from "./errors";
import { HttpResponse } from "../protocols/types";

export function badRequest(description: string): HttpResponse {
  const error = new InvalidDataError(description);

  return {
    statusCode: 400,
    body: {
      error_code: error.name,
      error_description: error.message,
    },
  };
}

export function serverError(): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
}

export function ok(payload: any): HttpResponse {
  return {
    statusCode: 200,
    body: payload
  }
}