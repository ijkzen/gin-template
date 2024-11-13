import { Component } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { StyleManagerService } from '../../service/style-manager.service';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbar, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  isDark = false;

  constructor(
    private sytleManager: StyleManagerService
  ) {

  }

  switchTheme() {
    if (this.isDark) {
      this.sytleManager.removeStyle("theme");
    } else {
      this.sytleManager.setStyle("theme", "magenta-violet.css");
    }

    this.isDark = !this.isDark;
  }
}
