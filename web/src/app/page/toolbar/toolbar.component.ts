import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ProgressBarService } from "../../service/progressbar.service";
import { ToastService } from "../../service/toast.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../shared/confirm-dialog/confirm-dialog.component";
import { RouterLink } from "@angular/router";
import { ThemeSwitchIconComponent } from "../../shared/theme-switch-icon/theme-switch-icon.component";

@Component({
  selector: "app-toolbar",
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ThemeSwitchIconComponent,
  ],
  templateUrl: "./toolbar.component.html",
  styleUrl: "./toolbar.component.scss",
})
export class ToolbarComponent {
  isDark = false;

  constructor(
    private progressBarService: ProgressBarService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  switchProgressBar() {
    if (this.progressBarService.showing()) {
      this.progressBarService.hide();
    } else {
      this.progressBarService.show();
    }
  }

  showToast() {
    this.toastService.showToast("这是一个通知🥰");
  }

  showConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "弹窗",
        message: `这是一个弹窗`,
      },
    });
  }
}
