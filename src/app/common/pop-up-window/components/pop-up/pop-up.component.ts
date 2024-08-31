import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'TTP-pop-up',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss',
})
export class PopUpComponent {
  public data: { message: string } = { message: '' };

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
  ) {
    this.data = data;
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
