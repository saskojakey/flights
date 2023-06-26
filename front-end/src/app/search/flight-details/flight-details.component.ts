import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FlightService } from 'src/app/services/flight.service';
import { FlightDto } from 'src/app/interfaces/flight-dto';
import { BookFlightPayload } from 'src/app/interfaces/book-flight-payload';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  @Input() data: any;
  @Input() boardingDate: any;
  @Input() returnDate: any;
  oneWay = false;
  showMessage = false;
  message = 'Added flight to my trips !';
  flight: FlightDto | undefined;
  user: string = '';
  bookingPayload: BookFlightPayload | undefined;

  constructor(
    private router: Router,
    private flightService: FlightService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.returnDate == '') {
      this.oneWay = true;
    }
  }

  formatDuration(time: string) {
    const [hours, minutes] = time.match(/\d+/g)!.map(Number);
    const formattedTime = `${hours ? hours + 'h' : ''}${
      minutes ? minutes + 'm' : ''
    }`;
    return formattedTime;
  }

  formatTimes(time: string) {
    return new Date(time).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  formatDates(isReturn: boolean) {
    const dateStr = isReturn ? this.returnDate : this.boardingDate;
    const date = new Date(dateStr);
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  onSelect(
    fromLocation: any,
    toLocation: any,
    boardTime: any,
    retTime: any,
    fliTime: any,
    stops: any,
    price: any,
    flightId: any
  ) {
    const navigationExtras = this.createNavigationExtras(
      fromLocation,
      toLocation,
      boardTime,
      retTime,
      fliTime,
      stops,
      price,
      flightId
    );

    localStorage.setItem(
      'flight',
      JSON.stringify(navigationExtras.queryParams)
    );
    this.router.navigate(['/payment'], navigationExtras);
  }

  addToTrips(
    fromLocation: any,
    toLocation: any,
    boardTime: any,
    retTime: any,
    fliTime: any,
    stops: any,
    price: any,
    flightId: any
  ) {
    const navigationExtras = this.createNavigationExtras(
      fromLocation,
      toLocation,
      boardTime,
      retTime,
      fliTime,
      stops,
      price,
      flightId
    );

    localStorage.setItem(
      'flight',
      JSON.stringify(navigationExtras.queryParams)
    );

    this.flight = JSON.parse(localStorage.getItem('flight')!);
    this.user = localStorage.getItem('currentUser')!;

    if (this.user) {
      this.user = JSON.parse(this.user);
    }

    this.bookingPayload = {
      flightDto: this.flight,
      user: this.user,
    };

    this.flightService.saveFlightToMyTrips(this.bookingPayload).subscribe(
      (Response) => {},
      (error) => {
        console.log(error);
      }
    );
    this.flightService.saveFlightToMyTrips;
  }

  showAlert() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }

  createId(
    fromLocation: string,
    toLocation: string,
    boardTime: string,
    depDate: string,
    id: string
  ) {
    return `${fromLocation}${toLocation}${boardTime}${depDate}${id}`;
  }

  getCarrierName(flight: any) {
    const carrierCode = flight.validatingAirlineCodes[0];
    return this.data.dictionaries.carriers[carrierCode];
  }

  createNavigationExtras(
    fromLocation: any,
    toLocation: any,
    boardTime: any,
    retTime: any,
    fliTime: any,
    stops: any,
    price: any,
    flightId: any
  ) {
    return {
      queryParams: {
        fromDestination: fromLocation,
        toDestination: toLocation,
        boardingDate: this.boardingDate,
        returnDate: this.returnDate,
        boardingTime: boardTime,
        returnTime: retTime,
        flightTime: fliTime,
        stops: stops,
        price: price,
        flightNumber: this.createId(
          fromLocation,
          toLocation,
          boardTime,
          this.boardingDate,
          flightId
        ),
        paid: true,
      },
    };
  }
}
