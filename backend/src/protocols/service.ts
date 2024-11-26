import {
  AvailableRideDetails,
  Ride,
  Driver,
  RouteResponse,
} from "./types";

export interface Service {}

export interface RideService extends Service {
  getAvailableRidesByDistance(
    origin: string,
    destination: string
  ): Promise<AvailableRideDetails>;
  confirmRide(ride: Ride): Promise<void>;
  getRidesByCustomer(customer_id: string): Promise<Array<Ride>>
}

export interface DriverService extends Service {
  validateDriver(driver: Driver, distance: number): Promise<Error>;
}
export interface GeolocationStrategy {
  getRoute(origin: string, destination: string): Promise<RouteResponse>;
}
