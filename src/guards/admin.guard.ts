import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.logueado();

  if (authService.logueado()) {
    return true;
  } else {
    router.navigate(['/login']);
    Swal.fire({
      title: 'Error',
      text: 'No estas logueado',
      icon: 'error',
    });
    return false;
  }
};
