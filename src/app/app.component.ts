import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, HomeComponent,RouterLink]
})
export class AppComponent {

    constructor(public auth: AuthService){

    }
    logout(){
        this.auth.logout();
    }
}
