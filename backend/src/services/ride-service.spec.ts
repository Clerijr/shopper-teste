import {
  RideService,
  GeolocationStrategy,
  Repository,
  DriverRepository
} from "../protocols";
import { RideServiceImpl } from "./ride-service";
import { makeDriverRepositoryStub, makeRideRepositoryStub, makeGeolocationStrategyStub } from "../factories/mocks";

type SutTypes = {
  sut: RideService;
  geolocationStrategyStub: GeolocationStrategy;
  driverRepositoryStub: DriverRepository
  rideRepositoryStub: Repository
};

const makeSut = (): SutTypes => {
  const geolocationStrategyStub = makeGeolocationStrategyStub();
  const driverRepositoryStub = makeDriverRepositoryStub()
  const rideRepositoryStub = makeRideRepositoryStub()
  const sut = new RideServiceImpl(geolocationStrategyStub, driverRepositoryStub, rideRepositoryStub);
  return {
    sut,
    geolocationStrategyStub,
    driverRepositoryStub,
    rideRepositoryStub
  };
};

describe("Ride Service", () => {
 test("Should return payload if correct data is provided", async () => {
    const { sut } = makeSut();
    const response = await sut.getAvailableRidesByDistance(
      "any_origin",
      "any_destination"
    );
    expect(response).toBeTruthy();
  });

   test("getCoordinatesFromAddress should be called with correct data", async () => {
    const { sut, geolocationStrategyStub } = makeSut();
    const getCoordinatesFromAddressSpy = jest.spyOn(
      geolocationStrategyStub,
      "getRoute"
    )
    await sut.getAvailableRidesByDistance(
      "any_origin",
      "any_destination"
    );
    expect(getCoordinatesFromAddressSpy).toHaveBeenCalledWith("any_origin", "any_destination")
  });
});
