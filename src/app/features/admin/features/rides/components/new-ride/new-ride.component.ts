import { AsyncPipe, DatePipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RidesFacade } from '../../services/rides.facade';
import { RideRoute } from '../../models/route';
import { RideFormModel } from '../../models/ride-form.model';
import { Subject } from 'rxjs';
import { RideInfoForm } from '../../models/ride-info-form-model';
import { ButtonComponent } from '../../../../../../common/button/button.component';
import { RideSegmentsForm } from '../../models/ride-segments-form.model';
import { getCarriagesKey } from '../../helpers/get-carriages-key';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'TTP-new-ride',
  standalone: true,
  imports: [
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
  templateUrl: './new-ride.component.html',
  styleUrl: './new-ride.component.scss',
  providers: [DatePipe],
})
export class NewRideComponent implements OnInit, OnDestroy {
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
  ) {}

  public ngOnInit(): void {
    this.rideFacade.route$.subscribe((route) => {
      if (route) {
        console.log(route);
        this.rideRoute = route;
        this.rideForm = this.rideFormInstance;
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  private get rideFormInstance(): FormGroup<RideFormModel> {
    return this.fb.group<RideFormModel>({
      schedule: this.fb.array<FormGroup<RideInfoForm>>([
        this.fb.group<RideInfoForm>({
          segments: this.createSegments(),
        }),
      ]),
    });
  }

  private createSegments(): FormArray<FormGroup<RideSegmentsForm>> {
    const formattedDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm', 'UTC');
    const segmentGroups = Array.from({ length: this.rideRoute.path.length - 1 }, () =>
      this.fb.group<RideSegmentsForm>({
        price: this.createPriceFormGroup(),
        time: this.fb.array<FormControl<string>>([
          this.fb.control(formattedDate || '', Validators.required),
          this.fb.control(formattedDate || '', Validators.required),
        ]),
      }),
    );

    return this.fb.array(segmentGroups);
  }

  private createPriceFormGroup(): FormGroup {
    const controls: Record<string, FormControl<number>> = {};
    const keys = getCarriagesKey(this.rideRoute.carriages);

    keys.forEach((key) => {
      controls[key] = this.fb.control<number>(0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]);
    });

    return this.fb.group(controls);
  }

  public returnToPreviousRoute(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  public onSubmit() {
    if (this.rideForm.valid) {
      console.log('test');
      console.log(this.rideForm.value);
      console.log('hello');
    }
  }

  public get scheduleFormControl(): FormArray<FormGroup<RideInfoForm>> {
    return this.rideForm.controls.schedule;
  }
}
