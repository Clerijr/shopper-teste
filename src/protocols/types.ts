export type HttpResponse = {
  statusCode: number;
  body?: any;
};

export type HttpRequest = {
  body?: any;
};

export type AvailableRide = {
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

export type estimateRideResponse = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: Array<AvailableRide>;
  routeResponse: any;
};
