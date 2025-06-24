import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { LoginComponent } from "./login/login.component";
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-home',
    imports: [ToolbarComponent, LoginComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {
    }

    isLogin() {
        return this.authService.isLogin();  
    }
}
