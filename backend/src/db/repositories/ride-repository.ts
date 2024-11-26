import { Ride, RideRepository } from "../../protocols";
import { Collection, Db, FindCursor } from "mongodb";


export class RideRepositoryImpl implements RideRepository {
  private rideCollection: Collection<Ride>;

  async initCollection(db: Db) {
    this.rideCollection = db.collection<Ride>("rides");
  }

  async insert(ride: Ride): Promise<void> {
    try {
      ride['created_at'] = Date.now()
      await this.rideCollection.insertOne(ride);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async getRidesByCustomer(customer_id: string): Promise<Array<Ride>> {
    return this.rideCollection.find({customer_id}).toArray()
  }
}
