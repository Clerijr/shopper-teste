import { GeolocationService, GoogleRouteResponse } from "../protocols";

const fakeRoute = {
    "routes": [
      {
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
      }
    ]
  }
  

export class GeolocationServiceImp implements GeolocationService {
  async getRoute(origin: string, destination: string): Promise<GoogleRouteResponse> {
    /* 
    - Do geolocation to get lat long 
    - with lat long get route 
    - Return route
    */
    return new Promise(resolve => resolve(fakeRoute.routes[0]))
  }
}
