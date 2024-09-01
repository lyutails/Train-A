import { Routes } from '@angular/router';
import { redirectIfAuthorizedGuard } from '../../../core/guards/auth-guard';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/orders/orders.component').then((m) => m.OrdersComponent),
    canActivate: [redirectIfAuthorizedGuard],
  },
];
