import {
  AvailableRideDetails,
  ConfirmRideRequest,
  Coordinates,
  Driver,
  GoogleRouteResponse,
} from "./types";

export interface Service {}

export interface RideService extends Service {
  getAvailableRidesByDistance(
    origin: string,
    destination: string
  ): Promise<AvailableRideDetails>;
  confirmRide(ride: ConfirmRideRequest): Promise<void>;
}

export interface DriverService extends Service {
  validateDriver(driver: Driver, distance: number): Promise<Error>;
}
export interface GeolocationService {
  getRoute(origin: string, destination: string): Promise<GoogleRouteResponse>;
}
