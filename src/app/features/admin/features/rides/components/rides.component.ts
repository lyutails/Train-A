import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideRoute } from '../models/route';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { RideFormModel } from '../models/ride-form.model';
import { RideInfoForm } from '../models/ride-info-form-model';
import { RouteSchedule } from '../../../../../repositories/rides/services/models/route-schedule.model';
import { RideSegmentsForm } from '../models/ride-segments-form.model';
import { RouteSegments } from '../../../../../repositories/rides/services/models/route-section.model';
import { MatInputModule } from '@angular/material/input';
import { isoDateValidator } from '../helpers/date-validator';

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
    MatIcon,
    MatIconButton,
    MatTooltip,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    ButtonComponent,
    MatTooltipModule,
    KeyValuePipe,
    MatInputModule,
  ],
  templateUrl: './rides.component.html',
  styleUrl: './rides.component.scss',
  providers: [DatePipe],
})
export class RidesComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject<void>();
  public rideRoute!: RideRoute;
  public rideForm!: FormGroup<RideFormModel>;
  public editIconColour = 'oklch(49.71% 0.165 259.85deg)';

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: NonNullableFormBuilder,
    private readonly datePipe: DatePipe,
  ) {}

  public ngOnInit(): void {
    this.rideForm = this.rideFormInstance;
    this.activatedRoute.data
      .pipe(
        map((data: { route?: RideRoute }) => data.route),
        filter((rideRoute): rideRoute is RideRoute => Boolean(rideRoute)),
        takeUntil(this.destroy$$),
        tap(console.log),
      )
      .subscribe((rideRoute) => {
        this.rideRoute = rideRoute;
        this.setRides();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public returnToPreviousRoute(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  public trackByValue(index: number, item: { key: string; value: number }): string {
    return item.value.toString();
  }

  public get scheduleFormControl(): FormArray<FormGroup<RideInfoForm>> {
    return this.rideForm.controls.schedule;
  }

  private get rideFormInstance(): FormGroup<RideFormModel> {
    return this.fb.group<RideFormModel>({
      schedule: this.fb.array<FormGroup<RideInfoForm>>([]),
    });
  }

  public setRides() {
    this.rideRoute.schedule.forEach((schedule) => {
      this.scheduleFormControl.push(this.createSegmentGroup(schedule));
    });
  }

  private createSegmentGroup(schedule: RouteSchedule) {
    return this.fb.group<RideInfoForm>({
      segments: this.createEditableForm(schedule.segments),
    });
  }

  private createEditableForm(segments: RouteSegments[]): FormArray<FormGroup<RideSegmentsForm>> {
    return this.fb.array<FormGroup<RideSegmentsForm>>(
      segments.map((segment) =>
        this.fb.group<RideSegmentsForm>({
          price: this.createPriceFormGroup(segment.price),
          time: this.fb.array(
            segment.time.map((t) => {
              const formattedTime = this.datePipe.transform(t, 'yyyy-MM-ddTHH:mm', 'UTC');
              return this.fb.control<string>({ value: formattedTime || '', disabled: true }, [
                Validators.required,
                isoDateValidator(),
              ]);
            }),
          ),
        }),
      ),
    );
  }

  private createPriceFormGroup(priceObj: Record<string, number>): FormGroup {
    const controls: Record<string, FormControl<number>> = {};

    Object.keys(priceObj).forEach((key) => {
      controls[key] = this.fb.control<number>({ value: priceObj[key], disabled: true }, [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ]);
    });

    return this.fb.group(controls);
  }

  public onSubmit(): void {
    this.rideForm.controls.schedule.controls.forEach((sched, index) => {
      if (sched.dirty) {
        console.log(sched.getRawValue());
        console.log(index);
      }
    });
  }

  public editPrice(priceControl: FormControl<number>) {
    priceControl.enable();
  }

  public savePrice(priceControl: FormControl<number>) {
    this.onSubmit();
    priceControl.disable();
  }

  public isEditButton(priceControl: FormControl<number>): boolean {
    return priceControl ? priceControl.enabled : false;
  }
}
