import { ServerError } from "../controllers/errors";
import {
  AvailableRideDetails,
  Repository,
  DriverRepository,
  GeolocationService,
  GoogleRouteResponse,
  Coordinates,
  Driver,
  HttpRequest,
  RideService,
  DriverService,
  ConfirmRideRequest
} from "../protocols";

export const makePromiseWithServerError = (): Promise<never> => {
  return new Promise((resolve, reject) => reject(new ServerError()));
};

export const makeAvailableRidesByDistance = (): Promise<AvailableRideDetails> => {
    return new Promise((resolve) =>
      resolve({
        origin: {
          latitude: -23.5617323,
          longitude: -46.6559812,
        },
        destination: {
          latitude: -22.9068467,
          longitude: -43.1728965,
        },
        distance: 432500,
        duration: "any_duration",
        options: [
          {
            id: 1,
            name: "any_name",
            description: "any_description",
            vehicle: "any_vehicle",
            review: {
              rating: 2,
              comment: "any_comment",
            },
            value: 1.5,
            minimum_distance: 1,
          },
        ],
        routeResponse: {
          distanceMeters: 432500,
          duration: "any_duration",
          legs: [],
        },
      })
    );
  };

export const makeRideRepositoryStub = (): Repository => {
  class RideRepositoryStub implements Repository {
    async insert(payload: any): Promise<void> {
      return;
    }
  }

  return new RideRepositoryStub();
};

export const makeDriverRepositoryStub = (): DriverRepository => {
  class DriverRepositoryStub implements DriverRepository {
    async insert(payload: any): Promise<void> {
      return;
    }
    async getDriversByDistance(distance: number): Promise<Array<Driver>> {
      return new Promise((resolve) => resolve([]));
    }
    async findDriverById(id: number): Promise<Driver> {
      return new Promise((resolve) =>
        resolve({
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
        })
      );
    }
  }
  return new DriverRepositoryStub();
};

export const makeGeolocationServiceStub = (): GeolocationService => {
  class GeolocationServiceStub implements GeolocationService {
    async getRoute(
      origin: string,
      destination: string
    ): Promise<GoogleRouteResponse> {
      return new Promise((resolve) =>
        resolve({
          distanceMeters: 432500,
          duration: "PT5H22M",
          legs: [
            {
              startLocation: {
                latitude: -23.5617323,
                longitude: -46.6559812,
              },
              endLocation: {
                latitude: -22.9068467,
                longitude: -43.1728965,
              },
              distanceMeters: 432500,
              duration: "PT5H22M",
              polyline: {
                encodedPolyline: "mfooGynypMeHgJdXsC",
              },
            },
          ],
          polyline: {
            encodedPolyline: "mfooGynypMeHgJdXsC",
          },
        })
      );
    }
    async getRouteFromCoordinates(
      origin: Coordinates,
      destination: Coordinates
    ): Promise<GoogleRouteResponse> {
      return;
    }
  }
  return new GeolocationServiceStub();
};

export const makeEstimateRequest = (): HttpRequest => ({
  body: {
    customer_id: "any_id",
    origin: "any_origin",
    destination: "any_destination",
  },
});

export const makeConfirmRequest = (): HttpRequest => ({
  body: {
    customer_id: "any_id",
    origin: "any_origin",
    destination: "any_destination",
    distance: 1000,
    duration: "any_duration",
    driver: {
      id: 1,
      name: "any_name",
    },
    value: 10,
  },
});

export const makeRideServiceStub = (): RideService => {
  class RideServiceStub implements RideService {
    async getAvailableRidesByDistance(
      origin: string,
      destination: string
    ): Promise<AvailableRideDetails> {
      return makeAvailableRidesByDistance();
    }
    async confirmRide(ride: ConfirmRideRequest): Promise<void> {
      return
    }
  }
  return new RideServiceStub();

};

export const makeDriverServiceStub = (): DriverService => {
  class DriverServiceStub implements DriverService {
    async validateDriver(driver: Driver): Promise<Error> {
      return
    }
  }
  return new DriverServiceStub();
};