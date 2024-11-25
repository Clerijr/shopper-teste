import {
  DriverRepository,
  RideService,
  AvailableRideDetails,
  GeolocationStrategy,
  Driver,
  ConfirmRideRequest,
  Repository,
} from "../protocols";

export class RideServiceImpl implements RideService {
  private readonly geolocationStrategy: GeolocationStrategy;
  private readonly driverRepository: DriverRepository;
  private readonly rideRepository: Repository;

  constructor(
    geolocationStrategy: GeolocationStrategy,
    driverRepository: DriverRepository,
    rideRepository: Repository
  ) {
    this.geolocationStrategy = geolocationStrategy;
    this.driverRepository = driverRepository;
    this.rideRepository = rideRepository
  }

  async getAvailableRidesByDistance(
    origin: string,
    destination: string
  ): Promise<AvailableRideDetails> {
    try {
      const route = await this.geolocationStrategy.getRoute(origin, destination);

      const drivers = await this.driverRepository.getDriversByDistance(
        route.distanceMeters
      );

      const payload = {
        origin: route.legs[0].startLocation,
        destination: route.legs[0].endLocation,
        distance: route.distanceMeters,
        duration: route.legs[0].duration,
        options: drivers,
        routeResponse: route,
      };

      return new Promise((resolve) => resolve(payload));
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmRide(ride: ConfirmRideRequest): Promise<void> {
    await this.rideRepository.insert(ride)
  }
}
