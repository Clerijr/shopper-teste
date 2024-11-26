import { Driver, Ride } from "./types";
import { Db, FindCursor } from "mongodb";

export interface Repository {
  insert(payload: any): void;
  initCollection(db: Db): void;
}

export interface DriverRepository extends Repository {
  getDriversByDistance(distance: number): Promise<Array<Driver>>;
  findDriverById(id: number): Promise<Driver>
}

export interface RideRepository extends Repository {
  getRidesByCustomer(customer_id: string): Promise<Array<Ride>>
}