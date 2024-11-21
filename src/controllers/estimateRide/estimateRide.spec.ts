import { RideController } from "./estimateRide";
import {
  ServerError,
} from "../errors";
import { DriverService, Driver } from "../../protocols";
import { badRequest } from "../helpers";

type SutType = {
  sut: RideController;
  driverService: DriverService;
};

const makeSut = (): SutType => {
  class DriverServiceStub implements DriverService {
    async insert(): Promise<void> {}

    async getDriversByDistance(
      origin: string,
      destination: string
    ): Promise<Array<Driver>> {
      return new Promise((resolve) => resolve([]));
    }
  }
  const driverService = new DriverServiceStub();
  const sut = new RideController(driverService);

  return {
    sut,
    driverService,
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
    expect(httpResponse).toEqual(badRequest("Missing Param: origin"));
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
    expect(httpResponse).toEqual(badRequest("Missing Param: destination"));
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
    expect(httpResponse).toEqual(badRequest("Missing Param: customer_id"));
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
    expect(httpResponse).toEqual(badRequest("Missing Param: customer_id"));
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
    expect(httpResponse).toEqual(
      badRequest("Origin can not be equal to Destination")
    );
  });

  test("Should return 500 if driverService throws", async () => {
    const { sut, driverService } = makeSut();
    jest
      .spyOn(driverService, "getDriversByDistance")
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

  test("Should return 200 if correct data is provided", async () => {
    const { sut, driverService } = makeSut();
    const getDriversByDistanceSpy = jest.spyOn(
      driverService,
      "getDriversByDistance"
    );
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(getDriversByDistanceSpy).toHaveBeenCalledWith("any_origin", "any_destination")
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBeTruthy();
  });
});
