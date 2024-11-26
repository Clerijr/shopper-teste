
import express, { Application } from "express";
import { initRoutes } from "./route";
import { Controller } from "../protocols";





export const initApp = (controller: Controller): Application => {
    const app: Application = express();
    const route = initRoutes(controller)
    
    app.use(express.json());
    app.use(route);
    app.listen(8080, () => "rodando na porta 8080");

    return app
}