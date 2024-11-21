import {
  GeolocationAdapter,
  Coordinates,
  GoogleRouteResponse,
} from "../protocols";

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

export class GeolocationAdapterImpl implements GeolocationAdapter {
  async getCoordinatesFromAddress(address: string): Promise<Coordinates> {
    try {
      /* Logica para chamar api de geolocation */
      return new Promise((resolve) =>
        resolve({
          latitude: "",
          longitude: "",
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async getRouteFromCoordinates(
    origin: Coordinates,
    destination: Coordinates
  ): Promise<GoogleRouteResponse> {
    try {
      /* Logica para chamar api de rotas */
      return new Promise((resolve) => {
        'fakeData';
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
