import express from "express";
import { Router, Request, Response } from "express";
import { RideController } from "./controllers/estimateRide/estimateRide";
import { RideServiceImpl } from "./services/ride";
import { DriverRepository } from "./repositories/driver";
import { GeolocationServiceImp } from "./services/geolocation";

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
app.listen(3333, () => "server running on port 3333");
