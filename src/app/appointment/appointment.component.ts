import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { app } from '../../../server';
import { log } from 'console';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  appointmentList: any[] = [];

  appointmentForm = new FormGroup({
    service: new FormControl('3', [Validators.required]),
    date: new FormControl('2024-07-24', [Validators.required]),
    time: new FormControl('16:00', [Validators.required])
  })

  constructor(private appointment: AppointmentService, private auth: AuthService, private router: Router) {
    this.appointment.getAllAppointment(auth.activeCustomer).subscribe(data => {
      this.appointmentList = data;
      console.log(this.appointmentList);
      
    })
  }

  cancel(appointmentId : number){
    this.appointment.cancel(appointmentId).subscribe(request => {
      console.log(appointmentId)      

      this.appointment.getAllAppointment(this.auth.activeCustomer).subscribe(data => {
        this.appointmentList = data;
        console.log(data);
        
      })
    })
  }

  onSubmit() {
    if (this.appointmentForm.valid) {

      const formValues = this.appointmentForm.value;

      const credentials = {
        customerEmail: this.auth.activeCustomer,
        service: this.appointmentForm.value.service,
        datatime: `${formValues.date}T${formValues.time}:00.000Z`
      };


      this.appointment.create(credentials).subscribe(request => {
        this.appointment.getAllAppointment(this.auth.activeCustomer).subscribe(data => {
          this.appointmentList = data;
        })
        console.log(credentials);
      });
    }
  }
}
