import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './admin/login/login.component';
import { ManageComponent } from './admin/manage/manage.component';
import { ReservationComponent } from './reservation/reservation.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
=======
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './admin/login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
<<<<<<< HEAD
    ManageComponent,
=======
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
