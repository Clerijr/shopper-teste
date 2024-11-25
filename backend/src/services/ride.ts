import {
  DriverRepository,
  RideService,
  AvailableRideDetails,
  GeolocationService,
  Driver,
} from "../protocols";

export class RideServiceImpl implements RideService {
  private readonly geolocationService: GeolocationService;
  private readonly driverRepository: DriverRepository;

  constructor(
    geolocationService: GeolocationService,
    driverRepository: DriverRepository
  ) {
    this.geolocationService = geolocationService;
    this.driverRepository = driverRepository;
  }

  async insert(payload: any): Promise<void> {
    return null;
  }
  async getAvailableRidesByDistance(
    origin: string,
    destination: string
  ): Promise<AvailableRideDetails> {
    try {
      const route = await this.geolocationService.getRoute(origin, destination);

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
  async validateDriver(driver: Driver): Promise<boolean> {
    const driverExists = this.driverRepository.findDriverById(driver.id);

    if (!driverExists) {
      return false
    }

    return true;
  }
}
