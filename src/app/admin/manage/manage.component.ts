import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css',
})
export class ManageComponent implements OnInit {
  reservatinList: [];
  editFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  editReservationId: string;
  checkSearchInput: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getAllReservations();
    this.editFormGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
      specialRequests: [''],
    });

    this.searchFormGroup = this.fb.group({
      searchName: [''],
      searchStartDate: [''],
      searchEndDate: [''],
    });
  }

  // the method for editing a reservation when user clicks on the edit button
  editReservation(editId: string) {
    this.reservationService.getReservation(editId).subscribe((data: any) => {
      console.log(data);
      this.editFormGroup.value['name'] = data.data.name;
      this.editFormGroup.patchValue({
        name: data.data[0].name,
        email: data.data[0].email,
        phone: data.data[0].tel,
        date: data.data[0].reserve_date,
        time: data.data[0].reserve_time,
        guests: data.data[0].pax,
        specialRequests: data.data[0].remarks,
      });
    });
  }

  async getAllReservations() {
    this.reservationService.getAllReservations().subscribe((data: any) => {
      this.reservatinList = data.data;
      console.log(this.reservatinList);
    });
  }

  // the method for deleting a reservation when user clicks on the delete button
  async deleteReservation(id: string) {
    Swal.fire({
      title: 'ยืนยันหรือไม่?',
      text: 'ท่านยืนยันการลบข้อมูลนี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        this.reservationService.deleteReservation(id).subscribe((data: any) => {
          Swal.fire(
            'ลบข้อมูลแล้ว!',
            'ท่านได้ทำการลบข้อมูลเรียบร้อยแล้ว',
            'success'
          );
          this.getAllReservations();
        });
      }
    });
  }

  onSubmitEdit() {
    if (!this.editFormGroup.invalid && this.editReservationId !== '') {
      this.reservationService
        .updateReservation(
          this.editReservationId,
          this.editFormGroup.value['name'],
          this.editFormGroup.value['email'],
          this.editFormGroup.value['phone'],
          this.editFormGroup.value['date'],
          this.editFormGroup.value['time'],
          this.editFormGroup.value['guests'],
          this.editFormGroup.value['specialRequests']
        )
        .subscribe((data: any) => {
          Swal.fire(
            'แก้ไขข้อมูลแล้ว!',
            'ท่านได้ทำการแก้ไขข้อมูลเรียบร้อยแล้ว',
            'success'
          );
          this.editReservationId = '';
          this.getAllReservations();
          this.editFormGroup.reset();
        });
    }
  }

  searchSubmit() {
    var name: string = '';
    var startDate: string = '';
    var endDate: string = '';

    if (
      this.searchFormGroup.value['searchStartDate'] !== '' &&
      this.searchFormGroup.value['searchEndDate'] === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกวันที่สิ้นสุด',
      });
      this.editFormGroup.reset();
      return;
    } else if (this.searchFormGroup.value['searchStartDate'] === '') {
      startDate = '';
      endDate = '';
    }

    if (this.searchFormGroup.value['searchName'] === '') {
      name = '-';
    } else {
      name = this.searchFormGroup.value['searchName'];
    }

    this.reservationService
      .searchReservation(
        name,
        this.searchFormGroup.value['searchStartDate'],
        this.searchFormGroup.value['searchEndDate']
      )
      .subscribe((data: any) => {
        this.reservatinList = data.data;
        this.checkSearchInput = true;
      });
  }
  clearSearch() {
    this.getAllReservations();
    this.checkSearchInput = false;
    this.searchFormGroup.reset();
  }
}
