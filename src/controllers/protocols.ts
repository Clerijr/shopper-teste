import { HttpRequest, HttpResponse } from "./types";

export interface RouteService {
    getDriversByDistance(origin: string, destination: string): Promise<number>
}

export interface Controller {
    handle(req: HttpRequest): Promise<HttpResponse>
}