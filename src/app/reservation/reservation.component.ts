import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
    if (this.reservationForm.valid) {
      console.log(this.reservationForm.value);
      // Here you would typically send the form data to a server
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.reservationForm.controls).forEach((key) => {
        const control = this.reservationForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }
}