import { AvailableRide } from "./types";

export interface Service {
  insert(payload: any): void;
}

export interface RideService extends Service {
  getAvailableRidesByDistance(origin: string, destination: string): Promise<Array<AvailableRide>>;
}
