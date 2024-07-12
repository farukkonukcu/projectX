import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from 'express';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from '../../nav/nav.component';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {


  constructor(private auth: AdminAuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('asd@asd', [Validators.required, Validators.email]),
    password: new FormControl('asdasd', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    if (this.loginForm.valid) {

      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.auth.login(credentials, this.loginForm.value.email!);
    }
  }
}
