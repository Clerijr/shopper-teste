import { HttpRequest, HttpResponse } from "./types";

export class RideController {
    async handle(req: HttpRequest): Promise<HttpResponse> {
        if(!req.body.origin) {
            return new Promise(resolve => resolve({
                statusCode: 400,
            }))
        }
        if(!req.body.destination) {
            return new Promise(resolve => resolve({
                statusCode: 400,
            }))
        }
        if(!req.body.customer_id) {
            return new Promise(resolve => resolve({
                statusCode: 400,
            }))
        }
    }
}