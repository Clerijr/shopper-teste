import { HttpRequest, HttpResponse } from "../types";

export class RideController {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({
            statusCode: 400,
        }))
    }
}