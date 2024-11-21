import { Coordinates, GoogleRouteResponse } from "./types";

export interface GeolocationAdapter {
    getCoordinatesFromAddress(address: string): Promise<Coordinates>;
    getRouteFromCoordinates(origin: Coordinates, destination: Coordinates): Promise<GoogleRouteResponse>;
  }