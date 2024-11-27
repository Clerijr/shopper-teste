import { ObjectId } from "mongodb";

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
  minimum_distance: number; 
  created_at?: number 

};

export type AvailableRideDetails = {
  origin: Coordinates;
  destination: Coordinates;
  distance: number;
  duration: string;
  options: Array<Driver>;
  routeResponse: RouteResponse;
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

export type RouteResponse = {
  distanceMeters: number;
  duration: string;
  legs: Array<any>;
  polyline?: any;
};

export type Ride = {
  _id?: ObjectId
  customer_id: string;
  origin: string;
  destination: string;
  duration: string;
  distance: number;
  driver: {
    id: number;
    name: string;
  };
  value: number;
  created_at?: number 
};

export type IdsToGetRide = { 
  customer_id: string; 
  driver_id: string 
};
