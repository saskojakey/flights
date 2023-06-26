import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  url = 'https://mailthis.to/SSFlightsAdmin';

  constructor(private http: HttpClient) {}

  postMessage(input: any) {
    return this.http.post(this.url, input, { responseType: 'text' }).pipe(
      map(
        (response) => {
          if (response) {
            console.log('Message sent successfully');
          } else {
            console.log('Message sent unsuccessfully');
          }
        },
        (error: any) => {
          return error;
        }
      )
    );
  }
}
