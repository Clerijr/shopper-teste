import { DriverNotFoundError, InvalidDistanceError } from "../errors";
import { DriverService, DriverRepository, Driver } from "../protocols";

export class DriverServiceImpl implements DriverService {
  private readonly driverRepository: DriverRepository;

  constructor(driverRepository: DriverRepository) {
    this.driverRepository = driverRepository;
  }

  async validateDriver(driver: Driver, distance: number): Promise<Error> {
    const driverData = await this.driverRepository.findDriverById(driver.id);
    const distanceKm = distance / 1000;

    if (!driverData) {
      return new DriverNotFoundError();
    }

    if (distanceKm < driverData.minimum_distance) {
      return new InvalidDistanceError();
    }
  }

  async getDriver(driver_id: number): Promise<Driver> {
    return await this.driverRepository.findDriverById(driver_id);
  }
}
