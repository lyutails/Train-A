import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { TrimPipe } from '../../../../../../common/pipes/trim-pipe/trim.pipe';

@Component({
  selector: 'TTP-dupe-name-popup',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    ButtonComponent,
    MatDialogClose,
    CommonModule,
    FormsModule,
    MatIconButton,
    MatHint,
    TrimPipe,
    MatError,
    ReactiveFormsModule,
  ],
  templateUrl: './dupe-name-popup.component.html',
  styleUrl: './dupe-name-popup.component.scss',
})
export class DupeNamePopupComponent {
  public dialogRef = inject(MatDialogRef<DupeNamePopupComponent>);
  public data = inject(MAT_DIALOG_DATA);

  closeDupePopup() {
    this.dialogRef.close();
  }
}
