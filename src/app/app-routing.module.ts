import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReservationComponent } from './reservation/reservation.component';
import { LoginComponent } from './admin/login/login.component';
<<<<<<< HEAD
import { ManageComponent } from './admin/manage/manage.component';
=======
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }, 
<<<<<<< HEAD
  { path: 'menu', component: MenuComponent },
  { path: 'about-us', component: AboutUsComponent }, 
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'admin/admin-login', component: LoginComponent },
  { path: 'admin/manage', component: ManageComponent },
  { path: 'admin', redirectTo: 'admin/admin-login', pathMatch: 'full' }
=======
  { path: 'menu', component: MenuComponent } ,
  { path: 'about-us', component: AboutUsComponent }, 
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'admin\login', component: LoginComponent },
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
