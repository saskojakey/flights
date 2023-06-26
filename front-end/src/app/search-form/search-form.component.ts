import { Component, OnInit } from '@angular/core';
import { AIRPORTS } from '../constants/all-airports';
import { Router } from '@angular/router';
import { Ng2SearchPipe } from 'ng2-search-filter';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  departureDate = '';
  returnDate = '';
  fromLocation = '';
  toLocation = '';
  airports = AIRPORTS;
  isOneWay = false;
  noStops = false;
  isFromInputDisabled = false;
  isToInputDisabled = false;
  hideListFrom = false;
  hideListTo = false;
  search = '';
  selectedNumber: number = 1;
  numbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    this.departureDate = today.toISOString().split('T')[0];
    this.returnDate = tomorrow.toISOString().split('T')[0];
  }

  goToSearch() {
    if (this.toLocation != '' && this.fromLocation != '') {
      const navigationExtras = {
        queryParams: {
          departureDate: this.departureDate,
          returnDate: this.isOneWay ? '' : this.returnDate,
          fromLocation: this.fromLocation,
          toLocation: this.toLocation,
          passengers: this.selectedNumber,
          nonStop: this.noStops,
        },
      };

      this.router.navigate(['/search'], navigationExtras);
    } else {
      alert('Please enter both destinations!');
    }
  }

  onDateChange(isDepDate: boolean) {
    const depTime = new Date(this.departureDate);
    const retTime = new Date(this.returnDate);

    if (
      (isDepDate && depTime.getTime() > retTime.getTime()) ||
      depTime.getTime() == retTime.getTime()
    ) {
      const newRetTime = new Date(depTime);
      newRetTime.setDate(newRetTime.getDate() + 1);
      this.returnDate = newRetTime.toISOString().split('T')[0];
    } else if (!isDepDate && retTime.getTime() < depTime.getTime()) {
      const newDepTime = new Date(retTime);
      newDepTime.setDate(newDepTime.getDate() - 1);
      this.departureDate = newDepTime.toISOString().split('T')[0];
    }
  }

  filterLocations(searchTerm: string) {
    return this.airports.filter((location) =>
      location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onLocationClick(location: any, isFrom: boolean) {
    if (isFrom) {
      this.isFromInputDisabled = true;
      this.fromLocation = location.code;
      this.hideListFrom = true;
      console.log(this.fromLocation);
    } else {
      this.isToInputDisabled = true;
      this.toLocation = location.code;
      this.hideListTo = true;
      console.log(this.toLocation);
    }
  }

  onClearLocation(isFrom: boolean) {
    if (isFrom) {
      this.isFromInputDisabled = false;
      this.fromLocation = '';
      this.hideListFrom = false;
    } else {
      this.isToInputDisabled = false;
      this.toLocation = '';
      this.hideListTo = false;
    }
  }
}
