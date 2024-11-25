import { Driver } from "./types";

export interface Repository {
  insert(payload: any): void;
}

export interface DriverRepository extends Repository {
  getDriversByDistance(distance: number): Promise<Array<Driver>>;
  findDriverById(id: string): Promise<Driver>
}
