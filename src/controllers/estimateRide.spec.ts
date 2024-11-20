import { RideController } from "./estimateRide";

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
  });
});
