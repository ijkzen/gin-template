import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { ScreenService } from "../../service/screen.service";
import { WebsocketService } from "../../service/websocket.service";
import { IconButtonComponent } from "../../shared/icon-button/icon-button.component";
import { ThemeSwitchIconComponent } from "../../shared/theme-switch-icon/theme-switch-icon.component";
import { ChangePasswordDialogComponent } from "../changepw/change-password-dialog.component";

@Component({
  selector: "app-admin",
  imports: [
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    ThemeSwitchIconComponent,
    IconButtonComponent,
  ],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss",
})
export class AdminComponent {
  routerList = [
    {
      name: "Nav",
      path: "./nav",
    },
    {
      name: "Menu1",
      path: "./menu1",
    },
    {
      name: "Menu2",
      path: "./menu2",
    },
    {
      name: "Menu3",
      path: "./menu3",
    },
  ];

  constructor(
    private websocketService: WebsocketService,
    private dialog: MatDialog,
    private authService: AuthService,
    private screenService: ScreenService
  ) {}

  showChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: "400px",
    });
  }

  logout() {
    this.authService.logout();
    location.reload();
  }

  isDesktop(): boolean {
    return this.screenService.isLargeScreen();
  }
}
