import { Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: BienvenidoComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    // canActivate: [authguardGuard],
  },
];
