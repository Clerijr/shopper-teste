import {
  RideService,
  Controller,
  HttpRequest,
  HttpResponse,
  DriverService,
} from "../../protocols";
import { DriverNotFoundError, InvalidDataError } from "../../errors";
import { badRequest, serverError, ok } from "../helpers";

export class RideController implements Controller {
  private readonly rideService: RideService;
  private readonly driverService: DriverService;

  constructor(rideService: RideService, driverService: DriverService) {
    this.rideService = rideService;
    this.driverService = driverService;
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

    const driverError = await this.driverService.validateDriver(req.body.driver, req.body.distance)

    if(driverError) {
      return badRequest(driverError)
    }

    await this.rideService.confirmRide(req.body)

    return ok({
      success: true
    });
  }
}
