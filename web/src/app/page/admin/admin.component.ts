import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeSwitchIconComponent } from "../../shared/theme-switch-icon/theme-switch-icon.component";
import { WebsocketService } from '../../service/websocket.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../changepw/change-password-dialog.component';
import { AuthService } from '../../service/auth.service';

@Component({
    selector: 'app-admin',
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

  constructor(
    private websocketService: WebsocketService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
  }


  showChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: "400px",
    });
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
