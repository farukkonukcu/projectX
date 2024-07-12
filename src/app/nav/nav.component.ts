import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }
}
