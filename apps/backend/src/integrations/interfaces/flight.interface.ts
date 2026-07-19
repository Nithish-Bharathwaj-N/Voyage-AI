export const FLIGHT_PROVIDER = 'FLIGHT_PROVIDER';

export interface FlightSearchRequest {
  originCode: string;
  destinationCode: string;
  date: string;
}

export interface FlightResult {
  flightId: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  currency: string;
}

export interface IFlightProvider {
  searchFlights(req: FlightSearchRequest): Promise<FlightResult[]>;
  bookFlight(flightId: string, userId: string): Promise<boolean>;
}
