import { HttpRequest, HttpResponse } from "./types"

export interface Controller {
    handle(req: HttpRequest): Promise<HttpResponse>
}