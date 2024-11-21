import { RouteServiceImpl } from "./route";

describe("Route Service", () => {
  test("Should return payload if correct data is provided", async () => {
    const sut = new RouteServiceImpl();
    const response = await sut.getDriversByDistance(
      "any_origin",
      "any_destination"
    );
    expect(response).toBeTruthy()
  });
});
