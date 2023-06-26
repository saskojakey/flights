import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public login(login: LoginRequest): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(
      `http://localhost:8080/api/login`,
      login
    );
  }

  public getRole(login: LoginRequest): Observable<Role> {
    return this.http.get<Role>(
      ('http://localhost:8080/api/role/' + login.username) 
    );
  }
}
