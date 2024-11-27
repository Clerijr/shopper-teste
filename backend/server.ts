import { RideController } from "./src/controllers/ride/ride-controller";
import { RideServiceImpl } from "./src/services/ride-service";
import { DriverRepository } from "./src/db/repositories/driver-repository";
import { GoogleRouteStrategy } from "./src/services/geolocation/google";
import { DriverServiceImpl } from "./src/services/driver-service";
import { RideRepositoryImpl } from "./src/db/repositories/ride-repository";
import { connectDB } from "./src/db/database";
import { initApp } from "./src/config/app";


const initServer = async () => {
  const db = await connectDB()
  const rideRepository = new RideRepositoryImpl()
  const driverRepository = new DriverRepository()

  driverRepository.initCollection(db)
  rideRepository.initCollection(db)

  const geolocationService = new GoogleRouteStrategy()
  const rideService = new RideServiceImpl(geolocationService, driverRepository, rideRepository)
  const driverService = new DriverServiceImpl(driverRepository)
  const rideController = new RideController(rideService, driverService)
  
  initApp(rideController)
}

initServer()

