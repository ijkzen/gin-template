import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarService } from './service/progress-bar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatProgressBarModule, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  showProgressBar: boolean = false;

  constructor(
    private progressBarService: ProgressBarService,
  ) {
    this.progressBarService.progressBar$.subscribe(show => {
      this.showProgressBar = show;
    });
  }
}
