import { RideServiceImpl } from "./ride";

describe("Driver Service", () => {
  test("Should return payload if correct data is provided", async () => {
    const sut = new RideServiceImpl();
    const response = await sut.getAvailableRidesByDistance(
      "any_origin",
      "any_destination"
    );
    expect(response).toBeTruthy()
  });

});
