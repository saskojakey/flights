import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightDto } from '../interfaces/flight-dto';
import { Observable } from 'rxjs';
import { BookFlightPayload } from '../interfaces/book-flight-payload';
import { MyTripDto } from '../interfaces/my-trips-dto';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  myTripDto: MyTripDto | undefined;

  constructor(private http: HttpClient) {}

  addFlight(flight: FlightDto) {
    return this.http.post<any>(
      `http://localhost:8080/api/flights/addflight`,
      flight
    );
  }

  public bookFlight(payload: BookFlightPayload): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/flights', payload);
  }

  saveFlightToMyTrips(payload: BookFlightPayload): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/flights/mytrips`,
      payload
    );
  }

  getMyTrips(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/mytrips/${username}`);
  }

  getBookedTrips(username: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/mytrips/bookings/${username}`
    );
  }

  deleteMyTrip(flightId: number, username: string): Observable<any> {
    return this.http.delete(
      `http://localhost:8080/api/mytrips/delete/${flightId}/${username}`
    );
  }
}
