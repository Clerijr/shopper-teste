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
});
