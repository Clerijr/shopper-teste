import { Router, Request, Response } from "express";
import { Controller } from "../protocols";

export const initRoutes = (controller: Controller): Router => {
  const route: Router = Router();

  route.post(
    "/ride/estimate",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.estimate(req);
      res.status(response.statusCode).json(response.body);
    }
  );
  route.patch(
    "/ride/confirm",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.confirm(req);
      res.status(response.statusCode).json(response.body);
    }
  );
  route.get(
    "/ride/:customer_id",
    async (req: Request, res: Response): Promise<void> => {
      const response = await controller.getRides(req);
      res.status(response.statusCode).json(response.body);
    }
  );

  return route;
};
