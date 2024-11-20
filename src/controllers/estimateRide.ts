import { MissingParamError } from "./errors";
import { HttpRequest, HttpResponse } from "./types";

export class RideController {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        const requiredFields = [ 'origin', 'destination', 'customer_id' ]
        for(const field of requiredFields) {
            if (!req.body[field]) {
                return new Promise(resolve => resolve({
                    statusCode: 400,
                    body: {
                        message: new MissingParamError(field)
                    }
                }))
            }
        }
    }
}