import { Coordinates, GeolocationStrategy, RouteResponse } from "../../protocols";
import { InvalidAddressForGeocodingError, NoRoutesFoundError, ServerError } from "../../errors";
import axios from 'axios';

export class OpenRouteStrategy implements GeolocationStrategy {
    private readonly apiKey: string;
    private readonly geocodeUrl: string = 'https://api.openrouteservice.org/geocode/search';
    private readonly directionsUrl: string = 'https://api.openrouteservice.org/v2/directions/driving-car';
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
    }

    private async geocode(address: string): Promise<Coordinates> {
        try {
          const response = await axios.get(this.geocodeUrl, {
            params: { api_key: this.apiKey, text: address },
          });
          const { features } = response.data;
          if (features && features.length > 0) {
            const [lng, lat] = features[0].geometry.coordinates;
            return { latitude: lat, longitude: lng };
          } else {
            throw new InvalidAddressForGeocodingError(address);
          }
        } catch (error) {
          throw new ServerError();
        }
      }

      public async getRoute(origin: string, destination: string): Promise<RouteResponse> {
        try {
          const originCoords = await this.geocode(origin);
          const destinationCoords = await this.geocode(destination);
    
          const response = await axios.post(
            this.directionsUrl,
            {
              coordinates: [
                [originCoords.longitude, originCoords.latitude],
                [destinationCoords.longitude, destinationCoords.latitude],
              ],
            },
            {
              headers: { Authorization: this.apiKey, 'Content-Type': 'application/json' },
            }
          );
    
          const { routes } = response.data;
          if (routes && routes.length > 0) {
            return routes[0].summary.distance;
          } else {
            throw new NoRoutesFoundError();
          }
        } catch (error) {
          throw new ServerError();
        }
      }
  }