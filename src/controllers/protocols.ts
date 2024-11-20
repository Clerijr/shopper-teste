import { HttpRequest, HttpResponse } from "./types";

export interface RouteService {
    calculateDistance(origin: string, destination: string): Promise<number>
}

export interface Controller {
    handle(req: HttpRequest): Promise<HttpResponse>
}