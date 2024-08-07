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
import { FirestoreService } from '../../../services/firestore.service';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { TextoDecoradoDirective } from '../../../directives/texto-decorado.directive';
import { ColorDirective } from '../../../directives/color.directive';
import { OrdenamientoDirective } from '../../../directives/ordenamiento.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule,TextoDecoradoDirective,ColorDirective,OrdenamientoDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @BlockUI() blockUI!: NgBlockUI;
  router: Router = inject(Router);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor(
    private authS: AuthService,
    private firestoreS: FirestoreService
  ) {}

  formLogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,3}$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  irRegistro() {
    this.router.navigate(['/elegirusuario']);
  }

  submitForm() {
    this.blockUI.start('Ingresando a la aplicacion...');
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;
    if (this.formLogin.valid && email && password) {
      this.authS
        .logueo(email, password)
        .then((estaValidado) => {
          if (estaValidado.tipo == 'profesional') {
            if (
              estaValidado.validado &&
              'autorizado' in estaValidado &&
              estaValidado.autorizado
            ) {
              this.blockUI.stop();
              Swal.fire({
                title: 'Ingreso exitoso',
                text: 'Bienvenido',
                icon: 'success',
              });
              this.router.navigate(['/home']);
            } else if (
              estaValidado.validado &&
              'autorizado' in estaValidado &&
              estaValidado.autorizado == false
            ) {
              this.blockUI.stop();
              Swal.fire({
                title: 'Error',
                text: 'Usuario no autorizado por el administrador',
                icon: 'error',
              });
            } else {
              this.blockUI.stop();
              Swal.fire({
                title: 'Error',
                text: 'Usuario no validado',
                icon: 'error',
              });
            }
          } else if (estaValidado.tipo == 'administrador') {
            this.blockUI.stop();
            Swal.fire({
              title: 'Ingreso exitoso',
              text: 'Bienvenido',
              icon: 'success',
            });
            this.router.navigate(['/home']);
          } else {
            if (estaValidado.validado) {
              this.blockUI.stop();
              Swal.fire({
                title: 'Ingreso exitoso',
                text: 'Bienvenido',
                icon: 'success',
              });
              this.router.navigate(['/home']);
            } else {
              this.blockUI.stop();
              Swal.fire({
                title: 'Error',
                text: 'Usuario no validado',
                icon: 'error',
              });
            }
          }
        })
        .catch((error) => {
          this.blockUI.stop();
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

  loginEspecialista() {
    this.formLogin.setValue({
      email: 'test-3aip0nmqr@srv1.mail-tester.com',
      password: 'asdasd123',
    });
  }

  loginEspecialistaDos() {
    this.formLogin.setValue({
      email: 'jogeg26673@kinsef.com',
      password: 'asdasd123',
    });
  }

  loginPaciente() {
    this.formLogin.setValue({
      email: 'gebolis212@mposhop.com',
      password: 'asdasd123',
    });
  }

  loginPacienteDos() {
    this.formLogin.setValue({
      email: 'test-pootof6dt@srv1.mail-tester.com',
      password: 'asdasd123',
    });
  }

  loginPacienteTres() {
    this.formLogin.setValue({
      email: 'pakalo2875@nolanzip.com',
      password: 'asdasd123',
    });
  }

  loginAdmin() {
    this.formLogin.setValue({
      email: 'admindos@admin.com',
      password: 'asdasd123',
    });
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
