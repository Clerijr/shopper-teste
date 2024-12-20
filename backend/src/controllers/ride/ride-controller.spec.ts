import { RideService, DriverService } from "../../protocols";
import { badRequest, notAcceptable, notFound } from "../helpers";
import { RideController } from "./ride-controller";
import {
  DriverNotFoundError,
  InvalidBodyError,
  InvalidQueryParamsError,
  InvalidDistanceError,
  ServerError,
} from "../../errors";
import {
  makeEstimateRequest,
  makeConfirmRequest,
  makeRideServiceStub,
  makeDriverServiceStub,
} from "../../factories/mocks";
import request from "supertest";
import express from "express";
import { initApp } from "../../config/app";

type SutType = {
  sut: RideController;
  rideService: RideService;
  driverService: DriverService;
};

const makeSut = (): SutType => {
  const rideService = makeRideServiceStub();
  const driverService = makeDriverServiceStub();
  const sut = new RideController(rideService, driverService);

  return {
    sut,
    rideService,
    driverService,
  };
};

describe("Ride Controller /estimate", () => {
  test("Should return 200 if correct data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate(makeEstimateRequest());
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toHaveProperty("origin");
    expect(httpResponse.body).toHaveProperty("destination");
    expect(httpResponse.body).toHaveProperty("routeResponse");
  });

  test("Should call getAvailableRidesByDistance with correct data", async () => {
    const { sut, rideService } = makeSut();
    const getDriversByDistanceSpy = jest.spyOn(
      rideService,
      "getAvailableRidesByDistance"
    );
    const httpResponse = await sut.estimate(makeEstimateRequest());
    expect(getDriversByDistanceSpy).toHaveBeenCalledWith(
      "any_origin",
      "any_destination"
    );
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toBeTruthy();
  });

  test("Should return 400 if origin is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        customer_id: "any_id",
        destination: "any_destination",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if destination is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if customer_id is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if customer_id is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        customer_id: "",
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if destination is equal to origin", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        customer_id: "any_id",
        origin: "same_address",
        destination: "same_address",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 500 if rideService throws", async () => {
    const { sut, rideService } = makeSut();
    jest
      .spyOn(rideService, "getAvailableRidesByDistance")
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => reject(new Error()));
      });
    const httpResponse = await sut.estimate(makeEstimateRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});

describe("Ride Controller /confirm", () => {
  test("Should return 200 if correct data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm(makeConfirmRequest());
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toHaveProperty("success");
  });

  test("Should return 400 if origin is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm({
      body: {
        customer_id: "any_id",
        destination: "any_destination",
        distance: 1000,
        duration: "any_duration",
        driver: {
          id: 1,
          name: "any_name",
        },
        value: 10,
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if destination is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
        distance: 1000,
        duration: "any_duration",
        driver: {
          id: 1,
          name: "any_name",
        },
        value: 10,
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if customer_id is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm({
      body: {
        origin: "any_origin",
        destination: "any_destination",
        distance: 1000,
        duration: "any_duration",
        driver: {
          id: 1,
          name: "any_name",
        },
        value: 10,
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if driver is empty", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
        destination: "any_destination",
        distance: 1000,
        duration: "any_duration",
        value: 10,
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 400 if destination is equal to origin", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.confirm({
      body: {
        customer_id: "any_id",
        origin: "same_address",
        destination: "same_address",
        distance: 1000,
        duration: "any_duration",
        driver: {
          id: 1,
          name: "any_name",
        },
        value: 10,
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidBodyError()));
  });

  test("Should return 404 if driver is not found", async () => {
    const { sut, driverService } = makeSut();
    jest
      .spyOn(driverService, "validateDriver")
      .mockResolvedValueOnce(new DriverNotFoundError());
    const httpResponse = await sut.confirm(makeConfirmRequest());
    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse).toEqual(notFound(new DriverNotFoundError()));
  });

  test("Should return 406 if distance is invalid for provided driver", async () => {
    const { sut, driverService } = makeSut();
    jest
      .spyOn(driverService, "validateDriver")
      .mockResolvedValueOnce(new InvalidDistanceError());
    const httpResponse = await sut.confirm(makeConfirmRequest());
    expect(httpResponse.statusCode).toBe(406);
    expect(httpResponse).toEqual(notAcceptable(new InvalidDistanceError()));
  });
});

/* describe("Ride Controller /getRides", () => {
  test("Should return 400 if customer_id is not provided", async () => {
    const { sut } = makeSut()
    const app = initApp(sut);
    const httpResponse = await request(app).get(
      "/ride/1?driver_id=2"
    );
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse).toEqual(badRequest(new InvalidQueryParamsError()));
  });
}); */
