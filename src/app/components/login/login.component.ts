import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor(private authS: AuthService) {}

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  irRegistro() {
    this.router.navigate(['/registro']);
  }

  submitForm() {
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;
    if (this.formLogin.valid && email && password) {
      this.authS
        .logueo(email, password)
        .then((estaValidado) => {
          if (estaValidado) {
            Swal.fire({
              title: 'Logueado',
              text: 'Bienvenido',
              icon: 'success',
            });
            this.router.navigate(['/home']);
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Email no verificado',
              icon: 'error',
            });
          }
        })
        .catch((error) => {
          let rta = this.firebaseErrors(error.code);
          Swal.fire({
            title: 'Error',
            text: rta,
            icon: 'error',
          });
          console.error('Error:', error);
        });
    }
  }

  firebaseErrors(error: string) {
    switch (error) {
      case 'auth/email-already-in-use':
        return 'Dirección de correo electrónico en uso.';
      case 'auth/weak-password':
        return 'contraseña debil ingrese una mas segura.';
      case 'auth/user-not-found':
        return 'Usuario no encontrado.';
      case 'auth/invalid-credential':
        return 'Credenciales invalidas.';
      default:
        return 'Ocurrió un error. Por favor, inténtelo nuevamente más tarde.';
    }
  }
}
