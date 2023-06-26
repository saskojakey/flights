import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { FlightDto } from '../interfaces/flight-dto';
import { BookFlightPayload } from '../interfaces/book-flight-payload';
import { UserInfoDto } from '../interfaces/user-info-dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isLoggedIn = false;
  paymentForm: any;
  params: any;
  flight: FlightDto = JSON.parse(localStorage.getItem('flight')!);
  userInfoDto: UserInfoDto | undefined;
  user: string = '';
  bookingPayload: BookFlightPayload | undefined;
  cvvValue: string = '';
  isCvvInvalid: boolean = false;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 12 }, (_, i) => 2023 + i);

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });

    if (!this.userService.isLoggedIn()) {
      this.isLoggedIn = false;
      this.router.navigate(['/log-in']);
    } else {
      this.isLoggedIn = true;
    }

    this.user = localStorage.getItem('currentUser')!;
    if (this.user) {
      this.user = JSON.parse(this.user);
    }

    this.userService.getUserInfo(this.user).subscribe((data) => {
      this.userInfoDto = data;
    });

    this.paymentForm = new FormGroup({
      nameOnCard: new FormControl('', Validators.required),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$'),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$'),
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]),
    });
  }

  onSubmit() {
    this.params = JSON.parse(localStorage.getItem('flight')!);

    if (this.params) {
      this.flight = JSON.parse(localStorage.getItem('flight')!);
      this.user = localStorage.getItem('currentUser')!;
      if (this.user) {
        this.user = JSON.parse(this.user);
      }
      this.bookingPayload = {
        flightDto: this.flight,
        user: this.user,
      };
      this.flightService.bookFlight(this.bookingPayload).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          console.log(this.user);
        }
      );
      this.router.navigate(['/success']);
    } else {
      alert('No selected flight!');
    }
  }

  get expirationDate() {
    return this.paymentForm.get('expirationDate');
  }

  get nameOnCard() {
    return this.paymentForm.get('nameOnCard');
  }

  get cvv() {
    return this.paymentForm.get('cvv');
  }

  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }

  formatExpirationDate(event: any) {
    const input = event.target.value;
    let formattedInput = input.replace(/\D/g, '').substr(0, 4);

    if (formattedInput.length > 2) {
      formattedInput = formattedInput.replace(/^(\d{2})(\d{0,2})/, '$1/$2');
    }

    this.paymentForm.patchValue({ expirationDate: formattedInput });
  }
}
