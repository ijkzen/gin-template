import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitchIconComponent } from "../../shared/theme-switch-icon/theme-switch-icon.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTabsModule, RouterLink, RouterOutlet, MatIconModule, MatButtonModule, ThemeSwitchIconComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  routerList = [
    {
      name: "Nav",
      path: "./nav"
    },
    {
      name: "Menu1",
      path: "./menu1"
    },
    {
      name: "Menu2",
      path: "./menu2"
    },
    {
      name: "Menu3",
      path: "./menu3"
    }
  ]
}
