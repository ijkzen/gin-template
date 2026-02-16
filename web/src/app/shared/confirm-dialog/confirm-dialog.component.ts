import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  protected data = inject<{ title: string; message: string }>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  protected get title() {
    return this.data.title;
  }

  protected get message() {
    return this.data.message;
  }

  protected cancel() {
    this.dialogRef.close(false);
  }

  protected confirm() {
    this.dialogRef.close(true);
  }
}
