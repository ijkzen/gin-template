import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ScreenService } from "./screen.service";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private snackBar = inject(MatSnackBar);
  private screen = inject(ScreenService);

  showToast(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: this.screen.isLargeScreen() ? "top" : "bottom",
    });
  }
}
