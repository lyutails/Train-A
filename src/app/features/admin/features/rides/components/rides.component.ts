import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, DatePipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RideRoute } from '../models/route';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../../common/button/button.component';
import { RideFormModel } from '../models/ride-form.model';
import { RideInfoForm } from '../models/ride-info-form-model';
import { RouteSchedule } from '../../../../../repositories/rides/services/models/route-schedule.model';
import { RideSegmentsForm } from '../models/ride-segments-form.model';
import { RouteSegments } from '../../../../../repositories/rides/services/models/route-section.model';
import { MatInputModule } from '@angular/material/input';
import { RidesFacade } from '../services/rides.facade';
import { ConfirmDeleteDialogComponent } from '../../../components/routes/features/components/confirm-delete-dialog/confirm-delete-dialog.component';
import { UpdateRideApi } from '../../../../../repositories/rides/services/models/update-route-api';

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
    MatIconButton,
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
    private readonly rideFacade: RidesFacade,
    public readonly dialog: MatDialog,
  ) {
    dayjs.extend(utc);
  }

  public ngOnInit(): void {
    this.rideForm = this.rideFormInstance;

    this.rideFacade.route$
      .pipe(
        filter((rideRoute): rideRoute is RideRoute => Boolean(rideRoute)),
        map((rideRoute) => {
          this.rideRoute = rideRoute;
          this.setRides();
        }),
        takeUntil(this.destroy$$),
      )
      .subscribe();
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
              return this.fb.control<string>({ value: formattedTime || '', disabled: true }, [Validators.required]);
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
        Validators.pattern('^[1-9][0-9]{0,7}$'),
      ]);
    });

    return this.fb.group(controls);
  }

  public onSubmit(): UpdateRideApi | null {
    const dirtyRideIndex = this.rideForm.controls.schedule.controls.findIndex((ride) => ride.dirty);

    if (dirtyRideIndex !== -1) {
      const dirtyRide = this.rideForm.controls.schedule.controls[dirtyRideIndex];
      return {
        id: this.rideRoute.id,
        rideId: this.rideRoute.schedule[dirtyRideIndex].rideId,
        segments: dirtyRide.getRawValue().segments,
      };
    } else {
      return null;
    }
  }

  public editPrice(priceControl: FormControl<number>) {
    priceControl.enable();
  }

  public savePrice(priceControl: FormControl<number>) {
    const newPrice = this.onSubmit();
    if (newPrice) {
      this.rideFacade.updateRide(newPrice).subscribe({
        complete: () => {
          priceControl.disable();
        },
      });
    }
  }

  public isEditButton(priceControl: FormControl<number>): boolean {
    return priceControl ? priceControl.enabled : false;
  }

  public isTimeEditButton(timeControl: FormControl<string>, timeControl2?: FormControl<string>): boolean {
    if (timeControl2) {
      return timeControl.enabled && timeControl2.enabled;
    }
    return timeControl ? timeControl.enabled : false;
  }

  public editTime(timeControl: FormControl<string>, timeControl2?: FormControl<string>) {
    timeControl.enable();
    if (timeControl2) {
      timeControl2.enable();
    }
  }

  public saveTime(timeControl: FormControl<string>, timeControl2?: FormControl<string>) {
    timeControl.setErrors(null);
    if (timeControl2) {
      timeControl2.setErrors(null);
    }

    const newSegement = this.onSubmit();

    if (newSegement) {
      this.rideFacade.updateRide(newSegement).subscribe({
        next: () => {
          timeControl.disable();
          if (timeControl2) {
            timeControl2.disable();
          }
        },
        error: () => {
          timeControl.setErrors({ timeIrrelevant: true });
          if (timeControl2) {
            timeControl2.setErrors({ timeIrrelevant: true });
          }
        },
      });
    }
  }

  public createNewRide() {
    this.router.navigate([`/admin/routes`, this.rideRoute.id, 'new-ride']);
  }

  public openDeleteModal(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmDelete(id);
      }
    });
  }

  public confirmDelete(id: number): void {
    this.rideFacade.deleteRide(this.rideRoute.id, id).subscribe({
      next: () => {
        this.rideRoute.schedule = this.rideRoute.schedule.filter((ride) => ride.rideId !== id);
        this.updateFormWithNewSchedule(this.rideRoute.schedule);
      },
      error: (err) => console.error('An error occurred:', err.message),
    });
  }

  private updateFormWithNewSchedule(newSchedule: RouteSchedule[]): void {
    this.scheduleFormControl.clear();
    newSchedule.forEach((schedule) => {
      this.scheduleFormControl.push(this.createSegmentGroup(schedule));
    });
  }

  public isPastDate(time: string): boolean {
    const dateToCompare = dayjs(time).utc();
    const currentDate = dayjs().utc();
    return dateToCompare.isBefore(currentDate);
  }
}
