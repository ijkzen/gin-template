import { Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ThemeService } from "../../service/theme.service";
import { IconButtonComponent } from "../icon-button/icon-button.component";

@Component({
  selector: "app-theme-switch-icon",
  imports: [MatIconModule, MatButtonModule, IconButtonComponent],
  templateUrl: "./theme-switch-icon.component.html",
  styleUrl: "./theme-switch-icon.component.scss",
})
export class ThemeSwitchIconComponent implements OnInit {
  private styleManager = inject(ThemeService);

  protected isDark = false;

  ngOnInit(): void {
    this.isDark = this.styleManager.isDark();
    this.styleManager.darkTheme$.subscribe((isDark) => {
      this.isDark = isDark;
    });
  }

  protected switchTheme(event: MouseEvent) {
    const currentTarget = event.currentTarget as HTMLElement | null;

    if (!currentTarget) {
      this.styleManager.switchTheme();
      return;
    }

    const rect = currentTarget.getBoundingClientRect();
    this.styleManager.switchTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }
}
