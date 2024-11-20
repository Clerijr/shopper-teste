import { HttpResponse } from "./types";

export function badRequest(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      message: error,
    },
  };
}
