import { Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { authGuard } from '../guards/auth.guard';

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
    path: 'elegirusuario',
    loadComponent: () =>
      import('./components/elegirusuario/elegirusuario.component').then(
        (m) => m.ElegirusuarioComponent
      ),
  },
  {
    path: 'registro/:usuario',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'notfound',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
  {
    path: 'administracion',
    loadComponent: () =>
      import('./components/administracion/administracion.component').then(
        (m) => m.AdministracionComponent
      ),
  },
  {
    path: 'turnos/paciente',
    loadComponent: () =>
      import(
        './components/pacientes/paciente-turnos/paciente-turnos.component'
      ).then((m) => m.PacienteTurnosComponent),
  },
  {
    path: 'especialistas/panel',
    loadComponent: () =>
      import(
        './components/especialistas/especialista-panel/especialista-panel.component'
      ).then((m) => m.EspecialistaPanelComponent),
  },
  {
    path: 'admin/turnos',
    loadComponent: () =>
      import('./components/admin/admin-turnos/admin-turnos.component').then(
        (m) => m.AdminTurnosComponent
      ),
  },
  {
    path: 'miperfil/:usuarios',
    loadComponent: () =>
      import('./components/miperfil/miperfil.component').then(
        (m) => m.MiperfilComponent
      ),
  },
  {
    path: 'mispacientes',
    loadComponent: () =>
      import('./components/mispacientes/mispacientes.component').then(
        (m) => m.MispacientesComponent
      ),
  },
  { path: '**', redirectTo: 'notfound' },
];
