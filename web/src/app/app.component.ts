import { ApplicationRef, Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ProgressBarService } from "./service/progressbar.service";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter } from "rxjs/internal/operators/filter";
import { concat, first, interval } from "rxjs";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, MatProgressBarModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  private progressBarService = inject(ProgressBarService);
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  protected showProgressBar = false;

  constructor() {
    this.progressBarService.progressBar$.subscribe((show) => {
      this.showProgressBar = show;
    });

    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === "VERSION_READY")
      )
      .subscribe((evt: VersionReadyEvent) => {
        if (evt) {
          document.location.reload();
        }
      });

    const appIsStable$ = this.appRef.isStable.pipe(
      first((isStable) => isStable === true)
    );
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);
    everySixHoursOnceAppIsStable$.subscribe(async () => {
      if (this.swUpdate.isEnabled) {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          if (updateFound) {
            document.location.reload();
          }
        } catch (err) {
          console.error("Failed to check for updates:", err);
        }
      } else {
        console.warn("Service Worker is not enabled.");
      }
    });
  }
}
