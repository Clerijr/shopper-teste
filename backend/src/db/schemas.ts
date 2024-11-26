export interface RideSchema {
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
    created_at: Date
  }