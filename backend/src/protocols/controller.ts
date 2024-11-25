import { HttpRequest, HttpResponse } from "./types"

export interface Controller {
    estimate(req: HttpRequest): Promise<HttpResponse>
    confirm(req: HttpRequest): Promise<HttpResponse>
}