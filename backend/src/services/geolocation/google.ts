import { GeolocationStrategy, RouteResponse } from "../../protocols";

export class GoogleRouteStrategy implements GeolocationStrategy {
  async getRoute(origin: string, destination: string): Promise<RouteResponse> {
    return new Promise(resolve => resolve({
      "distanceMeters": 432500,
      "duration": "PT5H22M",
      "legs": [
        {
          "startLocation": {
            "latitude": -23.5617323,
            "longitude": -46.6559812
          },
          "endLocation": {
            "latitude": -22.9068467,
            "longitude": -43.1728965
          },
          "distanceMeters": 432500,
          "duration": "PT5H22M",
          "polyline": {
            "encodedPolyline": "mfooGynypMeHgJdXsC"
          }
        }
      ],
      "polyline": {
        "encodedPolyline": "mfooGynypMeHgJdXsC"
      }
    }))
  }
}
