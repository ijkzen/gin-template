import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { AuthService } from "../../../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"], // 不在此处编写样式，使用 tailwind 类
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected username = "";
  protected password = "";
  protected errorMessage: string | null = null;

  login() {
    this.errorMessage = null;
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        if (res) {
          this.router.navigate(["/admin"]);
        } else {
          this.errorMessage = "登录失败，请检查您的凭据";
        }
      },
      error: (err) => {
        this.errorMessage = "登录失败，请检查您的凭据";
      },
    });
  }
}
