import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class ManageMenuComponent {
  menuList: [];

  constructor(
    private router: Router,
    private userService: UsersService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.getAllMenu();
  }

  async getAllMenu() {
    this.menuService.getAllMenu().subscribe((data: any) => {
      this.menuList = data.data.recordset;
      console.log(this.menuList);
    });
  }
}
