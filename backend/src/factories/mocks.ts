import { ServerError } from "../controllers/errors"
import { AvailableRideDetails } from "../protocols"

export const makePromiseWithServerError = (): Promise<never> => {
    return new Promise((resolve, reject) => reject(new ServerError()))
}

export const makeAvailableRidesByDistance = (): Promise<AvailableRideDetails> => {
    return new Promise(resolve => resolve({
        origin: {
            latitude: -23.5617323,
            longitude: -46.6559812
          },
        destination: {
            "latitude": -22.9068467,
            "longitude": -43.1728965
          },
        distance: 432500,
        duration: "any_duration",
        options: [
            {
                id: 1,
                name: "any_name",
                description:
                  "any_description",
                vehicle: "any_vehicle",
                review: {
                  rating: 2,
                  comment:
                    "any_comment",
                },
                value: 1.5,
              },
        ]
    }))
}