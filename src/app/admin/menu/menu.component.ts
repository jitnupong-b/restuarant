import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class ManageMenuComponent {
  menuList: [];
  menuForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    private menuService: MenuService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllMenu();
    this.menuForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      category: [''],
    });
  }

  async getAllMenu() {
    this.menuService.getAllMenu().subscribe((data: any) => {
      this.menuList = data.data.recordset;
      console.log(this.menuList);
    });
  }

  onSubmiMenu() {

  }
}
