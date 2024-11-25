import { ConfirmRideRequest, Repository } from "../protocols";

export class RideRepositoryImpl implements Repository {
    async insert(ride: ConfirmRideRequest): Promise<void> {
        return
    }
}