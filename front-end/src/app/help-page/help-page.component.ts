import { Component } from '@angular/core';
import { faqs } from '../constants/faq';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css'],
})
export class HelpPageComponent {
  isOpen = false;
  faqs = faqs;

  toggleAnswer(faq: any) {
    faq.isOpen = !faq.isOpen;
  }
}
