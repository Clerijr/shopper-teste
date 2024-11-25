import { Ride, Repository } from "../../protocols";
import { Collection, Db } from "mongodb";

let rideCollection: Collection<Ride>;

export class RideRepository implements Repository {
  async initCollection(db: Db) {
    rideCollection = db.collection<Ride>("rides");
  }

  async insert(ride: Ride): Promise<void> {
    try {
      await rideCollection.insertOne(ride);
    } catch (error) {
      throw new Error(error);
    }
  }
  /* async getAllRides() {
    return await rideCollection.find().toArray();
  } */
}
