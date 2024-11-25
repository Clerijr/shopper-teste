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

  async handle(req: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["origin", "destination", "customer_id"];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return new Promise((resolve) =>
            resolve(badRequest(`Missing Param: ${field}`))
          );
        }
      }
      const { origin, destination } = req.body;

      if (origin === destination) {
        return new Promise((resolve) =>
          resolve(badRequest("Origin can not be equal to Destination"))
        );
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
}
