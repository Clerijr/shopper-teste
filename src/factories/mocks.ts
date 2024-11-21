import { ServerError } from "../controllers/errors"

export const makePromiseWithServerError = (): Promise<never> => {
    return new Promise((resolve, reject) => reject(new ServerError()))
}