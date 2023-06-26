export interface SelectedFlight {
  fromDestination: string;
  toDestination: string;
  boardingDate: string;
  returnDate: string | null;
  boardingTime: string;
  returnTime: string | null;
  flightTime: string;
  stops: number;
  price: number;
  flightNumber: string;
  paid: boolean;
}
