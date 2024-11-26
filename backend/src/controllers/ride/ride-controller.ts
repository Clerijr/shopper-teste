import {
  RideService,
  Controller,
  HttpRequest,
  HttpResponse,
  DriverService,
  Ride,
  Driver
} from "../../protocols";
import {
  DriverNotFoundError,
  InvalidBodyError,
  InvalidDriverError,
  InvalidQueryParamsError,
  RidesNotFoundError,
} from "../../errors";
import { Request } from "express";
import {
  badRequest,
  serverError,
  ok,
  notAcceptable,
  notFound,
} from "../helpers";

export class RideController implements Controller {
  private readonly rideService: RideService;
  private readonly driverService: DriverService;

  constructor(rideService: RideService, driverService: DriverService) {
    this.rideService = rideService;
    this.driverService = driverService;
  }

  private validateFields = (
    fields: Array<string>,
    req: HttpRequest
  ): HttpResponse => {
    for (const field of fields) {
      if (!req.body[field]) {
        return badRequest(new InvalidBodyError());
      }
    }

    if (req.body.origin === req.body.destination) {
      return badRequest(new InvalidBodyError());
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
    try {
      const error = this.validateFields(requiredFields, req);
      if (error) return error;

      const driverError = await this.driverService.validateDriver(
        req.body.driver,
        req.body.distance
      );

      if (driverError?.name === "DRIVER_NOT_FOUND") {
        return notFound(driverError);
      }

      if (driverError?.name === "INVALID_DISTANCE") {
        return notAcceptable(driverError);
      }

      await this.rideService.confirmRide(req.body);

      return ok({
        success: true,
      });
    } catch (error) {
      return serverError();
    }
  }

  async getRides(req: Request): Promise<HttpResponse> {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    let driver: Driver;
    let payload: Array<Ride>;
    if (!customer_id) {
      return badRequest(new InvalidQueryParamsError());
    }

    payload = await this.rideService.getRidesByCustomer(customer_id);
    if(payload.length === 0) {
      return notFound(new RidesNotFoundError())
    }

    if (driver_id) {
      driver = await this.driverService.getDriver(Number(driver_id));
      if (!driver) {
        return badRequest(new InvalidDriverError());
      }
      payload.filter((ride) => ride.driver.id === Number(driver_id));
    }
    return ok(payload);
  }
}
