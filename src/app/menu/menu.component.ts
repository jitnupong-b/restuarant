import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  adminIsLoggedIn: boolean = false;

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit() {
    if(this.userService.isUserLoggedIn()) {
      this.adminIsLoggedIn = true;
    } else {
      this.adminIsLoggedIn = false;
    }
  }

  manageMenu() {
    this.router.navigate(['/admin/menu']);
  }
}
