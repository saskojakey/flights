import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  data: any;
  departureDate = '';
  returnDate = '';
  fromLocation = '';
  toLocation = '';
  passengers = 1;
  nonStop = false;
  isLoading = false;
  state: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.tokenService
      .getAccessToken()
      .pipe(
        mergeMap((token) => {
          this.api.setToken(token);
          return this.route.queryParams;
        })
      )
      .subscribe((params) => {
        this.departureDate = params['departureDate'];
        this.returnDate = params['returnDate'];
        this.fromLocation = params['fromLocation'];
        this.toLocation = params['toLocation'];
        this.passengers = params['passengers'];
        this.nonStop = params['nonStop'];

        this.searchFlights();
      });
  }

  searchFlights() {
    this.isLoading = true;

    const search$ = this.returnDate
      ? this.api.searchFlightOffers(
          this.fromLocation,
          this.toLocation,
          this.departureDate,
          this.returnDate,
          this.passengers,
          this.nonStop
        )
      : this.api.searchFlightOffersOneWay(
          this.fromLocation,
          this.toLocation,
          this.departureDate,
          this.passengers,
          this.nonStop
        );

    search$.subscribe(
      (data) => {
        this.data = data;
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }
}
