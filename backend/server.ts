import express from "express";
import { RideController } from "./src/controllers/ride/ride-controller";
import { RideServiceImpl } from "./src/services/ride-service";
import { DriverRepository } from "./src/db/repositories/driver-repository";
import { GoogleRouteStrategy } from "./src/services/geolocation/google";
import { DriverServiceImpl } from "./src/services/driver-service";
import { RideRepository } from "./src/db/repositories/ride-repository";
import { connectDB } from "./src/db/database";
import { initApp } from "./src/config/app";


const initServer = async () => {
  const db = await connectDB()
  const rideRepository = new RideRepository()
  rideRepository.initCollection(db)

  const geolocationService = new GoogleRouteStrategy()
  const driverRepository = new DriverRepository()
  const rideService = new RideServiceImpl(geolocationService, driverRepository, rideRepository)
  const driverService = new DriverServiceImpl(driverRepository)
  const rideController = new RideController(rideService, driverService)
  
  initApp(rideController)

  /* const app = express();
  const route = Router();
  app.use(express.json());
  
  route.post("/ride/estimate", async (req: Request, res: Response) => {
    const response = await rideController.estimate(req)
    res.status(response.statusCode).json(response.body)
  });
  route.patch("/ride/confirm", async (req: Request, res: Response) => {
    const response = await rideController.confirm(req)
    res.status(response.statusCode).json(response.body)
  })
  route.get("/ride/:customer_id", async (req: Request, res: Response) => {
   
    const response = await rideController.getRides(req)
    res.status(response.statusCode).json(response.body)


  });
  route.get("/", (req: Request, res: Response) => {
    res.json({
      message: "API Funcionando"
    })
  });
  
  app.use(route);
  app.listen(8080, () => "rodando na porta 8080"); */
}

initServer()

