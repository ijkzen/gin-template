import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../service/theme.service";
import { MatButtonModule } from "@angular/material/button";
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: "app-theme-switch-icon",
  imports: [MatIconModule, MatButtonModule, IconButtonComponent],
  templateUrl: "./theme-switch-icon.component.html",
  styleUrl: "./theme-switch-icon.component.scss",
})
export class ThemeSwitchIconComponent implements OnInit {
  constructor(private styleManager: ThemeService) {}

  isDark = false;

  ngOnInit(): void {
    this.isDark = this.styleManager.isDark();
    this.styleManager.darkTheme$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }

  switchTheme() {
    this.styleManager.switchTheme();
  }
}
