import { Driver } from "./types";

export interface Service {
  insert(payload: any): void;
}

export interface DriverService extends Service {
  getDriversByDistance(origin: string, destination: string): Promise<Array<Driver>>;
}
