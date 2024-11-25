import {
  RideService,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../protocols/index";
import { badRequest, serverError, ok } from "../helpers";

export class RideController implements Controller {
  private readonly rideService: RideService;

  constructor(rideService: RideService) {
    this.rideService = rideService;
  }

  async estimate(req: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["origin", "destination", "customer_id"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return badRequest(`Missing Param: ${field}`)
        }
      }
      const { origin, destination } = req.body;

      if (origin === destination) {
        return badRequest("Origin can not be equal to Destination")
      }

      const payload = await this.rideService.getAvailableRidesByDistance(
        origin,
        destination
      );
      return ok(payload);
    } catch (error) {
      return serverError();
    }
  }

  async confirm(req: HttpRequest): Promise<HttpResponse> {
    return badRequest(`Missing Param: origin`)
  }
}
