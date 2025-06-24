import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { AuthService } from "../../service/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-change-password-dialog",
  templateUrl: "./change-password-dialog.component.html",
  styleUrls: ["./change-password-dialog.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule
],
})
export class ChangePasswordDialogComponent {
  form: FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;
  errorMsg: string = "";
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
    });
  }

  submit() {
    this.errorMsg = "";
    if (this.form.invalid) {
      this.errorMsg = "请填写所有字段";
      return;
    }
    const { oldPassword, newPassword, confirmPassword } = this.form.value;
    if (oldPassword === newPassword) {
      this.errorMsg = "新密码不能和旧密码相同";
      return;
    }
    if (newPassword !== confirmPassword) {
      this.errorMsg = "两次输入的新密码不一致";
      return;
    }
    this.loading = true;
    this.authService
      .changePassword(oldPassword, newPassword)
      .subscribe((success) => {
        this.loading = false;
        if (success) {
          this.authService.logout();
          this.dialogRef.close(true);
          location.reload();
        } else {
          this.errorMsg = "修改密码失败，请检查旧密码是否正确";
        }
      });
  }

  close() {
    this.dialogRef.close(false);
  }
}
