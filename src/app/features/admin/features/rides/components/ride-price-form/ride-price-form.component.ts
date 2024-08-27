import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NonNullableFormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { PriceForm } from '../../models/price-form.model';

@Component({
  selector: 'TTP-ride-price-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormField,
    ButtonComponent,
    MatTooltipModule,
  ],
  templateUrl: './ride-price-form.component.html',
  styleUrl: './ride-price-form.component.scss',
})
export class RidePriceFormComponent implements OnInit {
  public priceForm!: FormGroup<PriceForm>;
  editSavePrice = signal(true);
  public editIconColour = 'oklch(49.71% 0.165 259.85deg)';
  @Input() price!: { key: string; value: number };
  isEdit = true;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.priceForm = this.priceFormInstance;
    this.priceForm.controls['price'].disable();
  }

  private get priceFormInstance(): FormGroup<PriceForm> {
    return this.fb.group<PriceForm>({
      price: this.fb.control(
        {
          value: 0,
          disabled: false,
        },
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ),
    });
  }

  public get priceFormControl(): FormControl<number> {
    return this.priceForm.controls.price;
  }

  editPrice() {
    this.priceForm.controls['price'].enable();
    this.editSavePrice.update((value) => !value);
    console.log('clicked', this.isEdit);
    this.isEdit = false;
    console.log('clicked', this.isEdit);
  }

  savePrice() {
    if (this.priceForm?.get('price')?.valid) {
      this.priceForm.controls['price'].disable();
    }
    this.editSavePrice.update((value) => !value);
  }
}
