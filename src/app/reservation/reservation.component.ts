import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import Swal from 'sweetalert2';
import { ReservationService } from '../services/reservation.service';
import { Router } from '@angular/router';
=======
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;

<<<<<<< HEAD
  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router
  ) {}
=======
  constructor(private fb: FormBuilder) {}
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535

  ngOnInit(): void {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
      specialRequests: [''],
    });
  }

  onSubmit() {
<<<<<<< HEAD

    if (this.reservationForm.valid) {
      Swal.fire({
        icon: 'question',
        html: true,
        title: 'ท่านแน่ใจหรือไม่ที่จะทำการจอง',
        text: 'กรุณาตรวจสอบข้อมูลก่อนทำการจอง<br/>ร้านของเราขอขอบพระคุณท่านที่ได้มาใช้บริการ',
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.reservationService
            .createReservation(
              this.reservationForm.value['name'],
              this.reservationForm.value['email'],
              this.reservationForm.value['phone'],
              this.reservationForm.value['date'],
              this.reservationForm.value['time'],
              this.reservationForm.value['guests'],
              this.reservationForm.value['specialRequests']
            )
            .subscribe((data) => {
              console.log(data);
              this.router.navigate(['/home']);
            });
        } else {
          this.reservationForm.reset();
        }
      });
    } else {
=======
    if (this.reservationForm.valid) {
      console.log(this.reservationForm.value);
      // Here you would typically send the form data to a server
    } else {
      // Mark all fields as touched to trigger validation messages
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535
      Object.keys(this.reservationForm.controls).forEach((key) => {
        const control = this.reservationForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 4a06c7c3fbcafd7ab138a03f1135b751d22df535
