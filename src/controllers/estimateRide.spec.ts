import { RideController } from "./estimateRide";
import { MissingParamError, OriginEqualToDestinationError } from "./errors";

describe("Ride Controller", () => {
  test("Should return 400 if origin is not provided", async () => {
    const sut = new RideController();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(new MissingParamError('origin'))
  });
  
  test("Should return 400 if destination is not provided", async () => {
    const sut = new RideController();
    const httpResponse = await sut.handle({
      body: {
        customer_id: "any_id",
        origin: "any_origin",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(new MissingParamError('destination'))
});

test("Should return 400 if customer_id is not provided", async () => {
    const sut = new RideController();
    const httpResponse = await sut.handle({
      body: {
          origin: "any_origin",
          destination: "any_destination",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(new MissingParamError('customer_id'))
});

test("Should return 400 if destination is equal to origin", async () => {
    const sut = new RideController();
    const httpResponse = await sut.handle({
      body: {
          customer_id: "any_id",
          origin: "same_address",
          destination: "same_address",
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.message).toEqual(new OriginEqualToDestinationError())
});
});
