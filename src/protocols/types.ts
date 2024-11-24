export type HttpResponse = {
  statusCode: number;
  body?: any;
};

export type HttpRequest = {
  body?: any;
};

export type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number;
};

export type AvailableRideDetails = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Array<Driver>
};

export type EstimateRideResponse = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Array<AvailableRideDetails>;
  routeResponse: any;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type GoogleRouteResponse = {
  distanceMeters: number,
  duration: string,
  legs: Array<any>,
  polyline?: any
};
