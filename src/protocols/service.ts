import { Driver } from "./types";

export interface Service {
  insert(payload: any): void;
}

export interface RouteService extends Service {
  getDriversByDistance(origin: string, destination: string): Promise<Array<Driver>>;
}
