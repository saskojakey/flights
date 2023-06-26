import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchComponent } from './search/search.component';
import { FlightDetailsComponent } from './search/flight-details/flight-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { ContactComponent } from './contact/contact.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { PopularDestinationsComponent } from './popular-destinations/popular-destinations.component';
import { HomepageExtraInfoComponent } from './homepage-extra-info/homepage-extra-info.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    SearchComponent,
    FlightDetailsComponent,
    HomePageComponent,
    HelpPageComponent,
    MyTripsComponent,
    ContactComponent,
    LogInComponent,
    SignUpComponent,
    PopularDestinationsComponent,
    HomepageExtraInfoComponent,
    FooterComponent,
    NavBarComponent,
    PaymentComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  exports: [FooterComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
