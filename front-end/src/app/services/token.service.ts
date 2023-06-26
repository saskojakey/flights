import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  tokenEndpoint = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  clientId = 't4MxsfafO018KNbe5A6imNLMQv8WTJbX';
  clientSecret = 'xZ6uAhyGnAYYIdp8';
  body = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  token$: Observable<string> = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAccessToken() {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    this.http
      .post<any>(this.tokenEndpoint, this.body, { headers })
      .subscribe((data) => {
        this.tokenSubject.next(data.access_token);
      });

    return this.token$;
  }
}
