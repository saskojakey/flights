import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  AMADEUS_API_KEY = 't4MxsfafO018KNbe5A6imNLMQv8WTJbX';
  accessToken = '';
  AMADEUS_API_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken() {
    return this.accessToken;
  }

  searchFlightOffers(
    fromLocation: string,
    toLocation: string,
    depDate: string,
    retDate: string,
    passengers: number,
    nonStop: boolean
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    const params = new HttpParams({
      fromObject: {
        originLocationCode: fromLocation,
        destinationLocationCode: toLocation,
        departureDate: depDate,
        returnDate: retDate,
        adults: passengers,
        max: '5',
        nonStop: nonStop,
      },
    });

    return this.http.get(this.AMADEUS_API_URL, { headers, params });
  }

  searchFlightOffersOneWay(
    fromLocation: string,
    toLocation: string,
    depDate: string,
    passengers: number,
    nonStop: boolean
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
    const params = new HttpParams({
      fromObject: {
        originLocationCode: fromLocation,
        destinationLocationCode: toLocation,
        departureDate: depDate,
        adults: passengers,
        max: '5',
        nonStop: nonStop,
      },
    });

    return this.http.get(this.AMADEUS_API_URL, { headers, params });
  }
}
