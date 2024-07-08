import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private auth: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tellnumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), this.patternValidator]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6), this.patternValidator])
  }, { validators: this.passwordValidators('password', 'password2') })

  onSubmit() {

    if (this.registerForm.valid) {

      const credentials = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        tellNumber: this.registerForm.value.tellnumber,
        address: this.registerForm.value.address,
        password: this.registerForm.value.password,
        password2: this.registerForm.value.password2
      };

      this.auth.register(credentials).subscribe(request => {
        this.router.navigateByUrl("/login");
        console.log(request)
      });
    }
  }
  passwordValidators(p1: string, p2: string) {
    return (control: AbstractControl) => {
      const password1 = control.get(p1)?.value;
      const password2 = control.get(p2)?.value;

      if (password1 === password2) {
        return null;
      } else {
        return { missmatch: true };
      }
    };
  }

  patternValidator(control: AbstractControl): ValidationErrors | null {
    ///^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/
    const complexityRegex = /^(?=.*[a-z]).{6,}$/;
    const v = control.value as string;
    if (complexityRegex.test(v)) {
      return null;
    }
    else {
      return { passwordStrenght: true }
    }
  }
}

