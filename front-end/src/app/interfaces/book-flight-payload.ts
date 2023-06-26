import { FlightDto } from './flight-dto';

export interface BookFlightPayload {
  flightDto: FlightDto | undefined;
  user: string;
}
