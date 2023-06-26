import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  queryParams: Params = {};
  paramPayment: any;
  registeredLogic: boolean = false;
  lastRoute: any;
  private currentUserSubject = new BehaviorSubject<string | null>(null);
  loginForm: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams['registered'] === 'true') {
        this.registeredLogic = true;
      }
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  closeBox() {
    this.registeredLogic = false;
  }

  public onLogin(loginForm: NgForm): void {
    this.loginService.login(loginForm.value).subscribe(
      (response) => {
        const { username } = loginForm.value;
        this.currentUserSubject.next(username);
        localStorage.setItem('token', JSON.stringify(response));
        localStorage.setItem('currentUser', JSON.stringify(username));
        if (localStorage.getItem('flight')) {
          this.router.navigate(['/payment'], this.paramPayment);
        } else {
          window.location.href = '/home';
        }
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          alert('Incorrect username or password');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    );

    this.loginService.getRole(loginForm.value).subscribe((response) => {
      localStorage.setItem('role', JSON.stringify(response));
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') as string);
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
