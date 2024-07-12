import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7138/';

  constructor(private http: HttpClient, private router: Router) { }

  login(customer: any, email: string) {
    return this.http.post(this.baseUrl + "login", customer).subscribe(req => {
      console.log(req);
      localStorage.setItem('activeCustomer', JSON.stringify(email))
      this.router.navigateByUrl("/appointment");
    });
  }

  register(customer: any) {
    return this.http.post(this.baseUrl + "register", customer);
  }

  activeCustomer(){
    if(localStorage.getItem('activeCustomer') == null){
      return "";
    }
    else{
      return JSON.parse(localStorage.getItem('activeCustomer')!);
    }
  }

  logout() {
    localStorage.removeItem('activeCustomer')
    this.router.navigateByUrl("/login");
  }
}
