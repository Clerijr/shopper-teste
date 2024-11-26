import { Request } from "express"
import { HttpRequest, HttpResponse } from "./types"

export interface Controller {
    estimate(req: HttpRequest): Promise<HttpResponse>
    confirm(req: HttpRequest): Promise<HttpResponse>
    getRides(req: Request): Promise<HttpResponse>
}