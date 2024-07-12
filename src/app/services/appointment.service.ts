import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'https://localhost:7138/';

  constructor(private http: HttpClient) { }

  create(appointment: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "createappointment", appointment);
  }

  cancel(appointmentId: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + "cancelappointment", appointmentId);
  }

  getMyAppointment(email: string): Observable<any[]> {
    let params = new HttpParams().set('email', email);
    return this.http.get<any>(this.baseUrl + "getmyappointment", { params });
  }

  getAllAppointment(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl + "getallappointment");
  }
}
