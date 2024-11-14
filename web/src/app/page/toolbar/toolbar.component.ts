import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { StyleManagerService } from '../../service/style-manager.service';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarService } from '../../service/progress-bar.service';
import { ToastService } from '../../service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  isDark = false;

  constructor(
    private styleManager: StyleManagerService,
    private progressBarService: ProgressBarService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {

  }

  switchTheme() {
    if (this.isDark) {
      this.styleManager.removeStyle("theme");
    } else {
      this.styleManager.setStyle("theme", "magenta-violet.css");
    }

    this.isDark = !this.isDark;
  }

  switchProgressBar() {
    if (this.progressBarService.showing()) {
      this.progressBarService.hide()
    } else {
      this.progressBarService.show()
    }
  }

  showToast() {
    this.toastService.showToast("这是一个通知🥰")
  }

  showConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: '弹窗',
        message: `这是一个弹窗`
      }
    })
  }
}
