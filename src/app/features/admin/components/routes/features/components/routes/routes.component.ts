import { Component, OnInit } from '@angular/core';
import { RouteAPI } from '../../models/routes.model';
import { RoutesService } from '../../../../../../../repositories/routes/services/routes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../../../../../common/button/button.component';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.scss',
})
export class RoutesComponent implements OnInit {
  routes: RouteAPI[] = [];
  isFormVisible = false;
  createRouteForm!: FormGroup;
  currentRoute: RouteAPI | null = null;

  constructor(
    private readonly routesService: RoutesService,
    public readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
  ) {
    this.createRouteForm = this.fb.group({
      carriages: this.fb.array([
        this.fb.group({
          name: [''],
          rows: [0],
          leftSeats: [0],
          rightSeats: [0],
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.routesService.getRoutes().subscribe({
      next: (data) => {
        this.routes = data;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  public showCreateForm(): void {
    this.currentRoute = null;
    this.isFormVisible = true;
  }

  public showUpdateForm(route: RouteAPI): void {
    this.currentRoute = { ...route };
    this.isFormVisible = true;
  }

  public handleFormSubmit(): void {
    if (!this.createRouteForm.valid) return;

    const formValue = this.createRouteForm.value;
    const routeData: RouteAPI = {
      id: this.currentRoute ? this.currentRoute.id : 0,
      path: formValue.stations,
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

  private confirmDelete(routeId: number): void {
    this.routesService.deleteRoute(routeId).subscribe({
      next: () => {
        this.routes = this.routes.filter((route) => route.id !== routeId);
      },
      error: (error) => console.error('There was an error deleting the route!', error),
    });
  }

  get carriages(): FormArray {
    return this.createRouteForm.get('carriages') as FormArray;
  }

  createCarriageFormGroup(): FormGroup {
    return this.fb.group({
      code: [null, Validators.required],
      name: [null, Validators.required],
      rows: [null, Validators.required],
      leftSeats: [null, Validators.required],
      rightSeats: [null, Validators.required],
    });
  }

  addCarriage(): void {
    this.carriages.push(this.createCarriageFormGroup());
  }

  removeCarriage(index: number): void {
    this.carriages.removeAt(index);
  }
}
