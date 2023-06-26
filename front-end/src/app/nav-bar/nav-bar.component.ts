import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  buttonText = '';
  @Input() isAdmin = false;
  @Input() isLoggedIn = false;
  @Input() currentUser = 'Log Out';

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.buttonText = this.currentUser;
  }

  logout(): void {
    this.userService.logout();
    this.isAdmin = false;
  }

  newToken() {
    this.tokenService.getAccessToken().subscribe((token) => {
      this.apiService.setToken(token);
      console.log(token);
    });
  }

  onMouseEnter() {
    this.buttonText = 'Log Out';
  }

  onMouseLeave() {
    this.buttonText = this.currentUser!;
  }
}
