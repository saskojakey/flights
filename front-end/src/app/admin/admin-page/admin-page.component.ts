import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ApiService } from 'src/app/services/api.service';
import { AdminDataService } from 'src/app/services/admin-data.service';
import { AdminData } from '../admin-data';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  data!: AdminData;
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private tokenService: TokenService,
    private adminDataService: AdminDataService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.adminDataService.getData().subscribe((response) => {
      this.data = response;
      this.isLoading = false;
    });
  }

  newToken() {
    this.tokenService.getAccessToken().subscribe((token) => {
      this.apiService.setToken(token);
    });
  }
}
