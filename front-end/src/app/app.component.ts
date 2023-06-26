import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'flight-app';
  isAdmin = false;
  isLoggedIn = false;
  currentUser = 'Log Out';

  constructor(
    private tokenService: TokenService,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    const role = JSON.parse(this.userService.isAdmin());

    if (this.isLoggedIn) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    }

    this.isAdmin = role.authority === 'ADMIN';

    this.tokenService.getAccessToken().subscribe((token) => {
      this.apiService.setToken(token);
    });
  }
}
