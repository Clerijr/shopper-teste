import {
  RideService,
  GeolocationService,
  Coordinates,
  GoogleRouteResponse,
  Repository,
  Driver
} from "../protocols";
import { RideServiceImpl } from "./ride";

type SutTypes = {
  sut: RideService;
  geolocationServiceStub: GeolocationService;
  driverRepositoryStub: Repository
};

const fakeRoute = {
  "routes": [
    {
      "distanceMeters": 432500,
      "duration": "PT5H22M",
      "legs": [
        {
          "startLocation": {
            "latitude": -23.5617323,
            "longitude": -46.6559812
          },
          "endLocation": {
            "latitude": -22.9068467,
            "longitude": -43.1728965
          },
          "distanceMeters": 432500,
          "duration": "PT5H22M",
          "polyline": {
            "encodedPolyline": "mfooGynypMeHgJdXsC"
          }
        }
      ],
      "polyline": {
        "encodedPolyline": "mfooGynypMeHgJdXsC"
      }
    }
  ]
}

const makeSut = (): SutTypes => {
  class DriverRepositoryStub implements Repository {
    async insert(payload: any): Promise<void> {
      return null
    }
    async getDriversByDistance(distance: number): Promise<Array<Driver>>{
      return new Promise(resolve => resolve([]))
    }
  }

  class GeolocationServiceStub implements GeolocationService {
    async getRoute(origin: string, destination: string): Promise<GoogleRouteResponse> {
      return new Promise((resolve) =>
        resolve(fakeRoute.routes[0])
      );
    }
    async getRouteFromCoordinates(
      origin: Coordinates,
      destination: Coordinates
    ): Promise<GoogleRouteResponse> {
      return null;
    }
  }

  const geolocationServiceStub = new GeolocationServiceStub();
  const driverRepositoryStub = new DriverRepositoryStub()
  const sut = new RideServiceImpl(geolocationServiceStub, driverRepositoryStub);
  return {
    sut,
    geolocationServiceStub,
    driverRepositoryStub
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
