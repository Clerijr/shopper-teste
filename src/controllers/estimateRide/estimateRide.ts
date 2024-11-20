import { MissingParamError, OriginEqualToDestinationError, ServerError } from "../errors";
import { badRequest, serverError } from "../helpers";
import { RouteService, Controller } from "../protocols";
import { HttpRequest, HttpResponse } from "../types";


export class RideController implements Controller {
    private readonly routeService: RouteService

    constructor(routeService: RouteService) {
        this.routeService = routeService
    }

    async handle(req: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = [ 'origin', 'destination', 'customer_id' ]
        for(const field of requiredFields) {
            if (!req.body[field]) {
                return new Promise(resolve => resolve(badRequest(new MissingParamError(field))))
            }
        }

        if(req.body.origin === req.body.destination) {
            return new Promise(resolve => resolve(badRequest(new OriginEqualToDestinationError())))
        }

        await this.routeService.calculateDistance(req.body.origin, req.body.destination)
        } catch(error) {
            return serverError()
        }
    }
}