import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ScreenService } from "./screen.service";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private snackBar: MatSnackBar, private screen: ScreenService) {}

  showToast(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: this.screen.isLargeScreen() ? "top" : "bottom",
    });
  }
}
