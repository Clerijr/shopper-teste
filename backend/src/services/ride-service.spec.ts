import {
  RideService,
  GeolocationService,
  Repository,
  DriverRepository
} from "../protocols";
import { RideServiceImpl } from "./ride-service";
import { makeDriverRepositoryStub, makeRideRepositoryStub, makeGeolocationServiceStub } from "../factories/mocks";

type SutTypes = {
  sut: RideService;
  geolocationServiceStub: GeolocationService;
  driverRepositoryStub: DriverRepository
  rideRepositoryStub: Repository
};

const makeSut = (): SutTypes => {
  const geolocationServiceStub = makeGeolocationServiceStub();
  const driverRepositoryStub = makeDriverRepositoryStub()
  const rideRepositoryStub = makeRideRepositoryStub()
  const sut = new RideServiceImpl(geolocationServiceStub, driverRepositoryStub, rideRepositoryStub);
  return {
    sut,
    geolocationServiceStub,
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
    const { sut, geolocationServiceStub } = makeSut();
    const getCoordinatesFromAddressSpy = jest.spyOn(
      geolocationServiceStub,
      "getRoute"
    )
    await sut.getAvailableRidesByDistance(
      "any_origin",
      "any_destination"
    );
    expect(getCoordinatesFromAddressSpy).toHaveBeenCalledWith("any_origin", "any_destination")
  });
});
