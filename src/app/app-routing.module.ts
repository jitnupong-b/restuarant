import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LoginComponent } from './admin/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }, 
  { path: 'menu', component: MenuComponent } ,
  { path: 'about-us', component: AboutUsComponent }, 
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'admin\login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
