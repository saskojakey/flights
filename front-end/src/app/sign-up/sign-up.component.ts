import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm: any;

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public onRegistration(addForm: NgForm): void {
    this.registrationService.register(addForm.value).subscribe(
      (Response) => {
        this.router.navigate(['log-in'], {
          queryParams: { registered: 'true' },
        });
      },
      (error) => {
        alert(error.message)
      }
    );
  }

  get username() {
    return this.signupForm.get('username');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get surname() {
    return this.signupForm.get('surname');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
}
