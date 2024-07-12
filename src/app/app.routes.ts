import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'appointment', component: AppointmentComponent, canActivate: [AuthGuard] }
];
