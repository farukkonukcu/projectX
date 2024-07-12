import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private baseUrl = 'https://localhost:7138/admin';

  public activeUser: any = "";
  
  constructor(private http: HttpClient, private router: Router) { }

  login(user: any, email: string) {
    return this.http.post(this.baseUrl + "login", user).subscribe(req => {
      this.activeUser = email;
      console.log(req);
    });
  }

  logout() {
    this.activeUser = "";
  }
}
