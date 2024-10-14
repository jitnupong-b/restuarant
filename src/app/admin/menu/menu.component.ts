import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class ManageMenuComponent {
  menuList: [];
  menuForm: FormGroup;
  isUpdate = false;

  constructor(
    private router: Router,
    private userService: UsersService,
    private menuService: MenuService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllMenu();
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      menuDesc: ['', Validators.required],
      menuPrice: ['', Validators.required],
    });
  }

  async getAllMenu() {
    this.menuService.getAllMenu().subscribe((data: any) => {
      this.menuList = data.data.recordset;
      console.log(this.menuList);
    });
  }

  onSubmitMenu() {
    if (this.menuForm.invalid) {
      console.log('xx');
      Object.keys(this.menuForm.controls).forEach((key) => {
        const control = this.menuForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    } else {
      if (this.isUpdate == false) {
        this.menuService.addMenu(this.menuForm.value).subscribe((data: any) => {
          if (data.status === 200) {
            this.getAllMenu();
            this.menuForm.reset();
          }
        });
      } else {
        this.menuService
          .updateMenu(this.menuForm.value)
          .subscribe((data: any) => {
            if (data.status === 200) {
              this.getAllMenu();
              this.menuForm.reset();
              this.isUpdate = false;
            }
          });
      }
    }
  }
}
