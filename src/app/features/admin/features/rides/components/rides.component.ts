import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideRoute } from '../models/route';
import { getPricesByValue } from '../helpers/get-prices-by-value';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { RidePriceFormComponent } from './ride-price-form/ride-price-form.component';
import { PriceForm } from '../models/price-form.model';

@Component({
  selector: 'TTP-rides',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    NgFor,
    NgIf,
    AsyncPipe,
    MatProgressSpinnerModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormField,
    CommonModule,
    FormsModule,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatFormField,
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
    RidePriceFormComponent,
  ],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
})
export class RidesComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  public rideRoute = signal<RideRoute | null>(null);
  public priceList = getPricesByValue;
  public priceForm!: FormGroup<PriceForm>;
  editSavePrice = signal(true);
  public editIconColour = 'oklch(49.71% 0.165 259.85deg)';
  @Input() price!: { key: string; value: number };
  isEdit = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private fb: NonNullableFormBuilder,
  ) {}

  public ngOnInit(): void {
    this.priceForm = this.priceFormInstance;
    this.activatedRoute.data
      .pipe(
        map((data: { route?: RideRoute }) => data.route),
        filter((rideRoute): rideRoute is RideRoute => Boolean(rideRoute)),
        takeUntil(this.destroy$$),
        tap(console.log),
      )
      .subscribe({
        next: (rideRoute) => {
          this.rideRoute.set(rideRoute);
        },
        error: (err) => {
          console.error('Failed to load ride route data', err);
        },
      });
    this.priceForm.controls['price'].disable();
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public returnToPreviousRoute(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
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
    this.editSavePrice.set(false);
  }

  savePrice() {
    if (this.priceForm?.get('price')?.valid) {
      this.price.value = this.priceForm.controls.price.value;
      this.priceForm.controls['price'].disable();
    }
    this.editSavePrice.set(true);
  }
}
