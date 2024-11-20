import { RideController } from "./estimateRide";
import {
  MissingParamError,
  OriginEqualToDestinationError,
  ServerError,
} from "../errors";
import { RouteService } from "../protocols";

type SutType = {
  sut: RideController;
  routeService: RouteService;
};

const makeSut = (): SutType => {
  class RouteServiceStub implements RouteService {
    async getDriversByDistance(
      origin: string,
      destination: string
    ): Promise<number> {
      return new Promise((resolve) => resolve(10000));
    }
  }
  const routeService = new RouteServiceStub();
  const sut = new RideController(routeService);

  return {
    sut,
    routeService,
  };
};

describe("Ride Controller", () => {
  test("Should return 400 if origin is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual("Missing Param: origin");
  });

  test("Should return 400 if destination is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(
      "Missing Param: destination"
    );
  });

  test("Should return 400 if customer_id is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(
      "Missing Param: customer_id"
    );
  });

  test("Should return 400 if customer_id is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "",
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(
      "Missing Param: customer_id"
    );
  });

  test("Should return 400 if destination is equal to origin", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        origin: "same_address",
        destination: "same_address",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(
      "Origin can not be equal to Destination"
    );
  });

  test("Should return 500 if routeService throws", async () => {
    const { sut, routeService } = makeSut();
    jest
      .spyOn(routeService, "getDriversByDistance")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
