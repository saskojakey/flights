import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../interfaces/registration-request';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  register(registration: RegistrationRequest) {
    return this.http.post<RegistrationRequest>(
      `http://localhost:8080/api/registration`,
      registration
    );
  }
}
