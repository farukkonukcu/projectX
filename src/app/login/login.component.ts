import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) { }

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
