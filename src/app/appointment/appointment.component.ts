import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NavComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  dateList: any[] = this.getDates();
  hourList: any[] = this.getHours();
  appointmentList: any[] = [];

  appointmentForm = new FormGroup({
    service: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl('')
  })

  constructor(private appointment: AppointmentService, private auth: AuthService, private router: Router) {
    this.appointment.getMyAppointment(auth.activeCustomer).subscribe(data => {
      this.appointmentList = data;
      console.log(this.appointmentList);

    })
  }

  getDates() {

    const dates = [];
    let startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    while (startDate <= endDate) {
      const formattedDate = startDate.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      dates.push(formattedDate);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  }

  getHours() {

    const startDate = new Date();
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(18, 0, 0, 0);
    const hours: string[] = [];
    let currentHour = startDate;

    while (currentHour <= endDate) {
      const hourString = currentHour.toLocaleString('tr-TR', { hour: 'numeric', minute: 'numeric' });
      hours.push(hourString);
      currentHour.setMinutes(currentHour.getMinutes() + 30);
    }
    return hours;
  }

  cancel(appointmentId: number) {
    this.appointment.cancel(appointmentId).subscribe(request => {
      console.log(appointmentId)

      this.appointment.getMyAppointment(this.auth.activeCustomer).subscribe(data => {
        this.appointmentList = data;

      })
    })
  }

  onSubmit() {
    if (this.appointmentForm.valid) {

      const formValues = this.appointmentForm.value;
      const [datePart, timePart] = formValues.date!.split('T');
      const [day, month, year] = datePart.split('.');

      const formattedDate = `${year}-${month}-${day}T${this.appointmentForm.value.time}:00`;
      const credentials = {
        customerEmail: this.auth.activeCustomer,
        serviceId: formValues.service,
        data: formattedDate
      };

      this.appointment.create(credentials).subscribe(request => {
        this.appointment.getMyAppointment(this.auth.activeCustomer).subscribe(data => {
          this.appointmentList = data;
          console.log(data);

        })
        console.log(credentials);
      });
    }
  }
}
