import {
  RideService,
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../protocols/index";
import { DriverNotFoundError, InvalidDataError } from "../errors";
import { badRequest, serverError, ok } from "../helpers";

export class RideController implements Controller {
  private readonly rideService: RideService;

  constructor(rideService: RideService) {
    this.rideService = rideService;
  }

  private validateFields = (fields: Array<string>, req: HttpRequest): HttpResponse => {
    for (const field of fields) {
      if (!req.body[field]) {
        return badRequest(new InvalidDataError());
      }
    }

    if (req.body.origin === req.body.destination) {
      return badRequest(new InvalidDataError());
    }
  };

  async estimate(req: HttpRequest): Promise<HttpResponse> {
    try {
    
      const requiredFields = ["origin", "destination", "customer_id"];
      const error = this.validateFields(requiredFields, req);
      if (error) return error;

      const payload = await this.rideService.getAvailableRidesByDistance(
        req.body.origin,
        req.body.destination
      );
      return ok(payload);
    } catch (error) {
      return serverError();
    }
  }

  async confirm(req: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["origin", "destination", "customer_id", "driver"];
    const error = this.validateFields(requiredFields, req);
    if (error) return error;

    const driverExists = await this.rideService.validateDriver(req.body.driver)

    if(!req.body.driver.id || !req.body.driver.name || !driverExists) {
      return badRequest(new DriverNotFoundError())
    }

    return null;
  }
}
