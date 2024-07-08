import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7138/';

  public activeCustomer: any = "";
  constructor(private http: HttpClient, private router: Router) { }

  login(customer: any, email:string) {
    return this.http.post(this.baseUrl + "login", customer).subscribe(req => {
      this.activeCustomer = email;
      console.log(req);
      
      this.router.navigateByUrl("/appointment");
    });
  }

  register(customer: any) {
    return this.http.post(this.baseUrl + "register", customer);
  }

  logout() {
    this.activeCustomer = "";
  }
}
