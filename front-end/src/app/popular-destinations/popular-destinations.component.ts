import { Component } from '@angular/core';
import { Destination } from '../interfaces/destination';
import { DestinationList } from '../constants/destinations-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css'],
})
export class PopularDestinationsComponent {
  destinations: Destination[] = DestinationList;

  constructor(private router: Router) {}

  onClick(destination: Destination) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const navigationExtras = {
      queryParams: {
        departureDate: today.toISOString().split('T')[0],
        returnDate: tomorrow.toISOString().split('T')[0],
        fromLocation: 'SKP',
        toLocation: destination.airportCode,
        passengers: 1,
        nonStop: 'false',
      },
    };

    this.router.navigate(['/search'], navigationExtras);
  }
}
