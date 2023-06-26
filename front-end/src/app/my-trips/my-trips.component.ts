import { Component, OnInit } from '@angular/core';
import { SelectedFlight } from '../interfaces/selected-flight';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { mergeMap, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css'],
})
export class MyTripsComponent implements OnInit {
  flights: any[] = [];
  bookedFlights: any[] = [];

  isLoggedIn = true;
  user = '';

  constructor(
    private flightService: FlightService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('currentUser')!;
    if (this.user) {
      this.user = JSON.parse(this.user);
    }

    forkJoin([
      this.flightService.getMyTrips(this.user),
      this.flightService.getBookedTrips(this.user),
    ]).subscribe(([myTrips, bookedTrips]) => {
      this.flights = myTrips;
      this.bookedFlights = bookedTrips;
    });
  }

  formatDate(dateStr: string) {
    return this.datePipe.transform(new Date(dateStr), 'MMM dd');
  }

  goToPayment(flight: SelectedFlight) {
    const navigationExtras = {
      queryParams: {
        flight,
      },
    };

    localStorage.setItem(
      'flight',
      JSON.stringify(navigationExtras.queryParams.flight)
    );

    this.router.navigate(['/payment'], navigationExtras);
  }

  removeFromMyTrips(flightId: number): void {
    this.flightService
      .deleteMyTrip(flightId, this.user)
      .pipe(
        mergeMap((res) => {
          this.flightService.getMyTrips(this.user).subscribe((data) => {
            this.flights = data;
          });
          return of(res);
        })
      )
      .subscribe();
  }
}
