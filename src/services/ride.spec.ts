import { makePromiseWithServerError } from "../factories/mocks";
import {
  RideService,
  GeolocationAdapter,
  Coordinates,
  GoogleRouteResponse,
} from "../protocols";
import { RideServiceImpl } from "./ride";

type SutTypes = {
  sut: RideService;
  geolocationAdapterStub: GeolocationAdapter;
};

const makeSut = (): SutTypes => {
  class GeolocationAdapterStub implements GeolocationAdapter {
    async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
      return new Promise((resolve) =>
        resolve({
          latitude: "",
          longitude: "",
        })
      );
    }
    async getRouteFromCoordinates(
      origin: Coordinates,
      destination: Coordinates
    ): Promise<GoogleRouteResponse> {
      return null;
    }
  }

  const geolocationAdapterStub = new GeolocationAdapterStub();
  const sut = new RideServiceImpl(geolocationAdapterStub);
  return {
    sut,
    geolocationAdapterStub,
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

  /* test("Should throw if geolocation service throws", async () => {
    const { sut, geolocationAdapterStub } = makeSut();
    jest
      .spyOn(geolocationAdapterStub, "getCoordinatesFromAddress")
      .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => reject(new Error()))
      });
    const promise = await sut.getAvailableRidesByDistance(
      "any_origin",
      "any_destination"
    );
  }); */
});
