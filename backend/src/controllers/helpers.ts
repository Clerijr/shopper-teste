import { ServerError } from "../errors";
import { HttpResponse } from "../protocols/types";

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error_code: error.name,
      error_description: error.message,
    },
  };
}

export function notFound(error: Error): HttpResponse {
  return {
    statusCode: 404,
    body: {
      error_code: error.name,
      error_description: error.message,
    },
  };
}

export function notAcceptable(error: Error): HttpResponse {
  return {
    statusCode: 406,
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