import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
      this.router.navigateByUrl("/admin");
    });
  }

  logout() {
    this.activeUser = "";
  }
}
