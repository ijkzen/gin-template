import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../service/theme.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-theme-switch-icon",
  imports: [MatIconModule, MatButtonModule],
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
