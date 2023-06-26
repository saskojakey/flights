import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ContactForm } from '../contact-form';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: any;
  alias = 'SSFlightsAdmin';
  isSuccessful = false;
  formData: ContactForm = { name: '',surname:'', email: '', message: '' };


  constructor(private contactService: ContactService,
    private router:Router,
    private http:HttpClient) {}

  ngOnInit(): void {
    this.isSuccessful = false;

    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.http.post('http://localhost:8080/api/send-email', this.formData).subscribe(
      () => {
        // Email sent successfully, perform any desired actions
        console.log('Email sent!');
        this.router.navigate(['home'])
      },
      error => {
        // Handle error if the email failed to send
        console.error('Error sending email:', error);
      }
    );
  }

  get name() {
    return this.contactForm.get('name');
  }

  get lastName() {
    return this.contactForm.get('last_name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }
}
