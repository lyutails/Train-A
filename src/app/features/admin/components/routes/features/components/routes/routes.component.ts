import { Component, OnInit } from '@angular/core';
import { RouteAPI } from '../../models/routes.model';
import { RoutesService } from '../../../../../../../repositories/routes/services/routes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, NonNullableFormBuilder, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { StationsService } from '../../../../../../../repositories/stations/services/stations.service';
import { CarriagesService } from '../../../../../../../repositories/carriages/services/carriages.service';
import { Carriage } from '../../../../../features/carriages/models/carriage.model';
import { StationInfo } from '../../../../../features/stations/models/station-info';
import { StationForm } from '../../models/station-form.model';
import { ConnectedStationsApi } from '../../../../../../../repositories/stations/models/connected-stations--api.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'TTP-routes',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ConfirmDeleteDialogComponent,
    ReactiveFormsModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  routes: RouteAPI[] = [];
  isFormVisible = false;
  createRouteForm!: FormGroup;
  currentRoute: RouteAPI | null = null;
  connectedStations: ConnectedStationsApi[][] = [];
  carriages: Carriage[] = [];
  stations: StationInfo[] = [];

  constructor(
    private readonly routesService: RoutesService,
    public readonly dialog: MatDialog,
    private readonly fb: NonNullableFormBuilder,
    private readonly stationsService: StationsService,
    private readonly carriagesService: CarriagesService,
    private cdr: ChangeDetectorRef,
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe({
      next: (data) => {
        console.log('Fetched routes data:', data);
        this.routes = (Array.isArray(data) ? data : []).map((route) => ({
          ...route,
          carriages: Array.isArray(route.carriages) ? route.carriages : [],
          path: Array.isArray(route.path) ? route.path : [],
        }));
      },
      error: (error) => console.error('There was an error!', error),
    });

    this.carriagesService.getCarriages().subscribe({
      next: (data) => {
        this.carriages = data;
      },
      error: (error) => console.error('Error loading carriages', error),
    });

    this.stationsService.getStations().subscribe({
      next: (data) => {
        this.stations = data;
      },
      error: (error) => console.error('Error loading stations', error),
    });
  }

  private initializeForms(): void {
    this.createRouteForm = this.fb.group({
      carriages: this.fb.array([], [Validators.required, Validators.minLength(3)]),
      stations: this.fb.array([], [Validators.required, Validators.minLength(3)]),
    });
  }

  public showCreateForm(): void {
    this.currentRoute = null;
    this.isFormVisible = true;
  }

  public showUpdateForm(route: RouteAPI): void {
    this.currentRoute = { ...route };
    this.isFormVisible = true;

    const stationsArray = this.createRouteForm.get('stations') as FormArray;
    this.currentRoute.path.forEach((stationId) => {
      stationsArray.push(this.createStationFormGroup(stationId));
    });

    const carriagesArray = this.createRouteForm.get('carriages') as FormArray;
    this.currentRoute.carriages.forEach(() => {
      carriagesArray.push(this.createCarriageFormGroup());
    });
  }

  public handleFormSubmit(): void {
    if (!this.createRouteForm.valid) return;

    const formValue = this.createRouteForm.value;
    const routeData: RouteAPI = {
      id: this.currentRoute ? this.currentRoute.id : 0,
      path: (formValue.stations as StationForm[]).map((s: StationForm) => s.station),
      carriages: formValue.carriages,
    };

    if (this.currentRoute?.id) {
      this.routesService.updateRoute(this.currentRoute.id, routeData).subscribe({
        next: () => {
          this.loadRoutes();
          const index = this.routes.findIndex((r) => r.id === this.currentRoute!.id);
          if (index !== -1) {
            this.routes[index] = routeData;
          }
          this.isFormVisible = false;
          this.cdr.detectChanges();
        },
        error: (error) => console.error('Update failed', error),
      });
    } else {
      this.routesService.postRoute(routeData).subscribe({
        next: (newRoute) => {
          this.routes.push(newRoute);
          this.isFormVisible = false;
        },
        error: (error) => console.error('Creation failed', error),
      });
    }
  }

  public handleCancel(): void {
    this.isFormVisible = false;
  }

  public openDeleteModal(routeId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { id: routeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.confirmDelete(routeId);
      }
    });
  }

  public confirmDelete(routeId: number): void {
    this.routesService.deleteRoute(routeId).subscribe({
      next: () => {
        this.routes = this.routes.filter((route) => route.id !== routeId);
      },
      error: (error) => console.error('There was an error deleting the route!', error),
    });
  }

  public createStationFormGroup(stationId?: number): FormGroup {
    return this.fb.group({
      station: [stationId || null, Validators.required],
    });
  }

  public createCarriageFormGroup(): FormGroup {
    return this.fb.group({
      code: this.fb.control({ value: '', disabled: false }),
      name: this.fb.control(
        { value: '', disabled: false },
        {
          validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
        },
      ),
      rows: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
      leftSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
      rightSeats: this.fb.control(
        { value: 0, disabled: false },
        {
          validators: [Validators.required, Validators.pattern('^([1-9]|1[0-8])$')],
        },
      ),
    });
  }

  public addCarriage(): void {
    const carriageControl = this.createRouteForm.get('carriages');
    if (carriageControl instanceof FormArray) {
      carriageControl.push(this.createCarriageFormGroup());
    }
  }

  public removeCarriage(index: number): void {
    const carriageControl = this.createRouteForm.get('carriages');
    if (carriageControl instanceof FormArray) {
      carriageControl.removeAt(index);
    }
  }

  public addStation(): void {
    const stationsControl = this.createRouteForm.get('stations');
    if (stationsControl instanceof FormArray) {
      stationsControl.push(this.createStationFormGroup());
    }
  }

  public removeStation(index: number): void {
    const stationsControl = this.createRouteForm.get('stations');
    if (stationsControl instanceof FormArray) {
      stationsControl.removeAt(index);
    }
    this.connectedStations.splice(index, 1);
  }

  public canAddStation(): boolean {
    const lastStation = (this.createRouteForm.get('stations') as FormArray).at(
      (this.createRouteForm.get('stations') as FormArray).length - 1,
    );
    return lastStation?.valid ?? false;
  }

  public onStationChange(index: number): void {
    const stationsControl = this.createRouteForm.get('stations');
    if (stationsControl instanceof FormArray) {
      if (index === stationsControl.length - 1 && stationsControl.at(index)?.valid) {
        this.addStation();
      }

      stationsControl.controls.forEach((control) => {
        control.get('station')?.updateValueAndValidity({ onlySelf: true });
      });
    }
  }

  public getStationsControls(): FormGroup[] {
    return (this.createRouteForm.get('stations') as FormArray).controls as FormGroup[];
  }

  public getCarriagesControls(): FormGroup[] {
    return (this.createRouteForm.get('carriages') as FormArray).controls as FormGroup[];
  }

  public getCarriageNames(carriages: Carriage[] | undefined): string {
    if (!carriages || !Array.isArray(carriages)) {
      return '';
    }

    return carriages
      .map((carriage) => {
        if (typeof carriage === 'string') {
          return carriage;
        } else if (carriage && carriage.name) {
          return carriage.name;
        } else {
          return '';
        }
      })
      .join(', ');
  }

  private loadRoutes(): void {
    this.routesService.getRoutes().subscribe({
      next: (data) => {
        this.routes = data.map((route) => ({
          ...route,
          carriages: route.carriages || [],
          path: route.path || [],
        }));
      },
      error: (error) => console.error('Error loading routes', error),
    });
  }

  public filteredStations(index: number): StationInfo[] {
    const selectedStationIds = this.getStationsControls()
      .filter((_, i) => i !== index)
      .map((stationCtrl) => stationCtrl.get('station')?.value);

    return this.stations.filter((station) => !selectedStationIds.includes(station.id));
  }
}
