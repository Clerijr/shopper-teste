import { DriverService, DriverRepository, Driver } from "../protocols";

export class DriverServiceImpl implements DriverService {
  private readonly driverRepository: DriverRepository;

  constructor(driverRepository: DriverRepository) {
    this.driverRepository = driverRepository;
  }

  async validateDriver(driver: Driver, distance: number): Promise<boolean> {
    const driverData = await this.driverRepository.findDriverById(driver.id);
    const distanceKm = distance / 1000;

    if (!driverData) {
      return false;
    }

    if (distanceKm < driverData.minimum_distance) {
      return false;
    }

    return true;
  }
}
