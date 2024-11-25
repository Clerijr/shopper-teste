import { AvailableRideDetails, Coordinates, Driver, GoogleRouteResponse } from "./types";

export interface Service {
  insert(payload: any): void;
}

export interface RideService extends Service {
  getAvailableRidesByDistance(origin: string, destination: string): Promise<AvailableRideDetails>;
  validateDriver(driver: Driver): Promise<boolean>;
}


export interface GeolocationService {
  getRoute(origin: string, destination: string): Promise<GoogleRouteResponse>;
}