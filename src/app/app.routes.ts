import { Routes } from '@angular/router';
import {authGuard} from '@core/guards';

export const routes: Routes = [
  { path: '', redirectTo: '/cattle', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/index').then(m => m.LoginComponent),
  },
  {
    path: 'cattle',
    loadComponent: () => import('./features/index').then(m => m.CattleListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cattle/add',
    loadComponent: () => import('./features/index').then(m => m.AddCattleComponent),
    canActivate: [authGuard]
  },
  {
    path: 'cattle/edit/:id',
    loadComponent: () => import('./features/index').then(m => m.AddCattleComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/cattle' }
];
