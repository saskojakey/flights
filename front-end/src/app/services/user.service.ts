import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser$: Observable<string>;
  private currentRoleSubject: BehaviorSubject<Role>;
  public currentRole$: Observable<Role>;

  constructor(private router: Router, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.currentRoleSubject = new BehaviorSubject<Role>(
      JSON.parse(localStorage.getItem('role')!)
    );  
    this.currentRole$ = this.currentRoleSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin(): string {
    return localStorage.getItem('role') as string
  }

  public getCurrentUser(): string {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('flight');
    localStorage.removeItem('role');
    window.location.href="/log-in"
  }

  getUserInfo(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/${username}`);
  }
}
