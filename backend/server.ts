import express from "express";
import { Router, Request, Response } from "express";
import { RideController } from "./src/controllers/ride/ride-controller";
import { RideServiceImpl } from "./src/services/ride-service";
import { DriverRepository } from "./src/repositories/driver-repository";
import { GeolocationServiceImp } from "./src/services/geolocation-service";
import { DriverServiceImpl } from "./src/services/driver-service";



const geolocationService = new GeolocationServiceImp()
const driverRepository = new DriverRepository()
const rideService = new RideServiceImpl(geolocationService, driverRepository)
const driverService = new DriverServiceImpl(driverRepository)
const rideController = new RideController(rideService, driverService)

const app = express();
const route = Router();
app.use(express.json());

route.post("/ride/estimate", async (req: Request, res: Response) => {
  const response = await rideController.estimate(req)
  res.status(response.statusCode).json(response.body)
});
route.patch("/ride/confirm", async (req: Request, res: Response) => {
  /* const response = await rideController.confirm(req)
  res.status(response.statusCode).json(response.body) */
})
route.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Working"
  })
});

app.use(route);
app.listen(8080, () => "server running on port 8080");
