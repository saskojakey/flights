export interface FlightDto {
  fromDestination: string;
  toDestination: string;
  boardingDate: string;
  returnDate: string;
  boardingTime: string;
  returnTime: string;
  flightTime: string;
  stops: number;
  price: number;
  flightNumber: number;
}
