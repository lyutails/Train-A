import { Component, OnInit } from '@angular/core';
import { RouteAPI } from '../../models/routes.model';
import { RoutesService } from '../../../../../../../repositories/routes/services/routes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, NonNullableFormBuilder, FormArray, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { StationsService } from '../../../../../../../repositories/stations/services/stations.service';
import { CarriagesService } from '../../../../../../../repositories/carriages/services/carriages.service';
import { Carriage } from '../../../../../features/carriages/models/carriage.model';
import { StationInfo } from '../../../../../features/stations/models/station-info';

export interface CarriageForm {
  code?: FormControl<string>;
  name?: FormControl<string>;
  rows: FormControl<number>;
  leftSeats: FormControl<number>;
  rightSeats: FormControl<number>;
}

export interface StationForm {
  city: FormControl<string>;
  latitude: FormControl<number>;
  longitude: FormControl<number>;
  station: number;
}

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
  connectedStations: StationInfo[][] = [];
  carriages: Carriage[] = [];
  stations: StationInfo[] = [];

  constructor(
    private readonly routesService: RoutesService,
    public readonly dialog: MatDialog,
    private readonly fb: NonNullableFormBuilder,
    private readonly stationsService: StationsService,
    private readonly carriagesService: CarriagesService,
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe({
      next: (data) => {
        this.routes = data;
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
      carriages: this.fb.array([this.createCarriageFormGroup()]),
      stations: this.fb.array([this.createStationFormGroup()]),
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
      path: formValue.stations.map((s: StationForm) => s.station),
      carriages: formValue.carriages,
    };

    if (this.currentRoute?.id) {
      this.routesService.updateRoute(this.currentRoute.id, routeData).subscribe({
        next: () => {
          const index = this.routes.findIndex((r) => r.id === this.currentRoute!.id);
          if (index !== -1) {
            this.routes[index] = routeData;
          }
          this.isFormVisible = false;
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
      code: [null, Validators.required],
      name: [null, Validators.required],
      rows: [null, Validators.required],
      leftSeats: [null, Validators.required],
      rightSeats: [null, Validators.required],
    });
  }

  public addCarriage(): void {
    (this.createRouteForm.get('carriages') as FormArray).push(this.createCarriageFormGroup());
  }

  public removeCarriage(index: number): void {
    (this.createRouteForm.get('carriages') as FormArray).removeAt(index);
  }

  public addStation(): void {
    const lastStationIndex = (this.createRouteForm.get('stations') as FormArray).length - 1;

    if (lastStationIndex >= 0) {
      const lastStationId = (this.createRouteForm.get('stations') as FormArray).at(lastStationIndex).value.station;
      const lastStation = this.stations.find((station) => station.id === lastStationId);
      const connectedStations = lastStation?.connectedTo || [];
      this.connectedStations.push(connectedStations);
    }
    (this.createRouteForm.get('stations') as FormArray).push(this.createStationFormGroup());
  }

  public removeStation(index: number): void {
    (this.createRouteForm.get('stations') as FormArray).removeAt(index);
    this.connectedStations.splice(index, 1);
  }

  public canAddStation(): boolean {
    const lastStation = (this.createRouteForm.get('stations') as FormArray).at(
      (this.createRouteForm.get('stations') as FormArray).length - 1,
    );
    return lastStation?.valid ?? false;
  }

  public onStationChange(index: number): void {
    if (index === (this.createRouteForm.get('stations') as FormArray).length - 1) {
      this.addStation();
    } else {
      this.connectedStations.splice(index + 1);
      (this.createRouteForm.get('stations') as FormArray).controls
        .slice(index + 1)
        .forEach(() => this.removeStation(index + 1));
    }
  }

  public getStationsControls(): FormGroup[] {
    return (this.createRouteForm.get('stations') as FormArray).controls as FormGroup[];
  }

  public getCarriagesControls(): FormGroup[] {
    return (this.createRouteForm.get('carriages') as FormArray).controls as FormGroup[];
  }
}
