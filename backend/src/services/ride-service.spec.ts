import {
  RideService,
  GeolocationService,
  Coordinates,
  GoogleRouteResponse,
  Repository,
  Driver
} from "../protocols";
import { DriverRepository } from "../repositories/driver-repository";
import { RideServiceImpl } from "./ride-service";

type SutTypes = {
  sut: RideService;
  geolocationServiceStub: GeolocationService;
  driverRepositoryStub: DriverRepository
  rideRepositoryStub: Repository
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
  class RideRepositoryStub implements Repository {
    async insert(payload: any): Promise<void> {
      return
    }
  }
  class DriverRepositoryStub implements Repository {
    async insert(payload: any): Promise<void>{
      return
    }
    async getDriversByDistance(distance: number): Promise<Array<Driver>>{
      return new Promise(resolve => resolve([]))
    }
    async findDriverById(id: number): Promise<Driver> {
      return new Promise(resolve => resolve({
        id: 1,
        name: "Homer Simpson",
        description:
          "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        review: {
          rating: 2,
          comment:
            "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        },
        value: 2.5,
        minimum_distance: 1,
      }))
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
      return
    }
  }

  const geolocationServiceStub = new GeolocationServiceStub();
  const driverRepositoryStub = new DriverRepositoryStub()
  const rideRepositoryStub = new RideRepositoryStub()
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
