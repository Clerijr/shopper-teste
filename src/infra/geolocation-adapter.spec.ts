import {
  GeolocationAdapter,
  Coordinates,
  GoogleRouteResponse,
} from "../protocols";
import { GeolocationAdapterImpl } from "./geolocation-adapter";

const fakeData = {
  routes: [
    {
      distanceMeters: 432500,
      duration: "PT5H22M",
      legs: [
        {
          startLocation: {
            latitude: -23.5617323,
            longitude: -46.6559812,
          },
          endLocation: {
            latitude: -22.9068467,
            longitude: -43.1728965,
          },
          distanceMeters: 432500,
          duration: "PT5H22M",
          polyline: {
            encodedPolyline: "mfooGynypMeHgJdXsC",
          },
        },
      ],
      polyline: {
        encodedPolyline: "mfooGynypMeHgJdXsC",
      },
    },
  ],
};

jest.setTimeout(10000)

describe('Geolocation Adapter', () => { 
  test('Should return Coordinates if correct data is provided ', async () => { 
    const sut = new GeolocationAdapterImpl()
    const address = 'any_address'
    const response = await sut.getCoordinatesFromAddress(address)
    expect(response).toHaveProperty('latitude')
    expect(response).toHaveProperty('longitude')
   })

   /* test('Should return Route if correct data is provided ', async () => { 
    const sut = new GeolocationAdapterImpl()
    const origin = {
      latitude:'any_latitude',
      longitude:'any_longitude'
    }
    const destination = {
      latitude:'any_latitude',
      longitude:'any_longitude'
    }
    await sut.getRouteFromCoordinates(origin, destination)
   }) */
 })