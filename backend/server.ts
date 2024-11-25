import express from "express";
import { Router, Request, Response } from "express";
import { RideController } from "./src/controllers/estimateRide/estimateRide";
import { RideServiceImpl } from "./src/services/ride";
import { DriverRepository } from "./src/repositories/driver";
import { GeolocationServiceImp } from "./src/services/geolocation";

const app = express();
const route = Router();

const geolocationService = new GeolocationServiceImp()
const driverRepository = new DriverRepository()
const rideService = new RideServiceImpl(geolocationService, driverRepository)
const rideController = new RideController(rideService)

app.use(express.json());

route.post("/ride/estimate", async (req: Request, res: Response) => {
  const response = await rideController.handle(req)
  res.status(response.statusCode).json(response.body)
});
route.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Working"
  })
});

app.use(route);
app.listen(8080, () => "server running on port 3333");
