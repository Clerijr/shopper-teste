import { RideController } from "./estimateRide";
import { DriverNotFoundError, InvalidDataError, ServerError } from "../errors";
import {
  RideService,
  DriverService,
  AvailableRideDetails,
  HttpRequest,
  Driver
} from "../../protocols";
import { badRequest } from "../helpers";
import { makeAvailableRidesByDistance } from "../../factories/mocks";

type SutType = {
  sut: RideController;
  rideService: RideService;
  driverService: DriverService
};

const makeEstimateRequest = (): HttpRequest => ({
  body: {
    customer_id: "any_id",
    origin: "any_origin",
    destination: "any_destination",
  },
});

const makeConfirmRequest = (): HttpRequest => ({
  body: {
    customer_id: "any_id",
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

const makeRideServiceStub = (): RideService => {
  class RideServiceStub implements RideService {
    async getAvailableRidesByDistance(
      origin: string,
      destination: string
    ): Promise<AvailableRideDetails> {
      return makeAvailableRidesByDistance();
    }

    async validateDriver(driver: Driver): Promise<boolean> {
      return true
    }
  }
  return new RideServiceStub();

};

const makeDriverServiceStub = (): DriverService => {
  class DriverServiceStub implements DriverService {
    async validateDriver(driver: Driver): Promise<boolean> {
      return true
    }
  }
  return new DriverServiceStub();
};

const makeSut = (): SutType => {
  const rideService = makeRideServiceStub();
  const driverService = makeDriverServiceStub()
  const sut = new RideController(rideService, driverService);

  return {
    sut,
    rideService,
    driverService
  };
};

describe("Ride Controller /estimate", () => {
  test("Should return 200 if correct data is provided", async () => {
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
  });

  test("Should return 400 if destination is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
  });

  test("Should return 400 if customer_id is not provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.estimate({
      body: {
        origin: "any_origin",
        destination: "any_destination",
      },
    });
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
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
    expect(httpResponse).toEqual(badRequest(new InvalidDataError()));
  });

  test("Should return 404 if driver data is invalid", async () => {
    const { sut, driverService } = makeSut();
    jest.spyOn(driverService, "validateDriver").mockResolvedValueOnce(false)
    const httpResponse = await sut.confirm({
      body: {
        customer_id: "any_id",
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
    expect(httpResponse).toEqual(badRequest(new DriverNotFoundError()));
  });
});
