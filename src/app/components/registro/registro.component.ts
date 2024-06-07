import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import {
  Storage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { FirestoreService } from '../../../services/firestore.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  opciones: any[] = [
    { etiqueta: 'Opción 1', valor: 'opcion1' },
    { etiqueta: 'Opción 2', valor: 'opcion2' },
    { etiqueta: 'Opción 3', valor: 'opcion3' },
  ];

  storage: Storage = inject(Storage);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storageUpload = getStorage();

  savedFileNames: any = [];
  tipoUsuario: string = 'Paciente';
  isChecked: boolean = false;
  router: Router = inject(Router);
  tipoForm: any;

  formRegistro = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    edad: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(18),
      Validators.max(99),
    ]),
    dni: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    obrasocial: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
    ]),
    especialidad: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    imagenes: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async submitForm() {
    const formArray = this.formRegistro.get('imagenes') as FormArray;
    let url: string | string[] = [];

    for (const control of formArray.controls) {
      if (control.value !== '') {
        const fileRef = ref(this.storage, `imagenes/${control.value.name}`);
        await uploadBytesResumable(fileRef, control.value).then(
          async (snapshot) => {
            url.push(await getDownloadURL(snapshot.ref));
          }
        );
      }
    }

    const email = this.formRegistro.get('email')?.value;
    const password = this.formRegistro.get('password')?.value;

    if (this.tipoUsuario === 'Paciente') {
      if (email && password) {
        this.authService
          .crearUsuario(email, password, url[0])
          .then((user) => {
            this.firestoreService
              .agregarFirestorePaciente(this.formRegistro, url[0])
              .then(() => {
                this.savedFileNames = [];
                this.formRegistro.reset();
                Swal.fire({
                  title: 'Registro exitoso',
                  text: 'Se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                });
              });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      }
    } else {
      if (email && password) {
        this.authService
          .crearUsuario(email, password, url[0])
          .then((user) => {
            this.firestoreService
              .agregarFirestoreProfesional(this.formRegistro, url)
              .then(() => {
                this.savedFileNames = [];
                this.formRegistro.reset();
                Swal.fire({
                  title: 'Registro exitoso',
                  text: 'Se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                });
              });
          })
          .catch((error) => {
            let rta = this.firebaseErrors(error.code);
            Swal.fire({
              title: 'Error',
              text: rta,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      }
    }
  }

  onFileChange(event: any) {
    let files = event.target.files;
    if (files) {
      const formArray = this.formRegistro.get('imagenes') as FormArray;
      for (let i = 0; i < files.length; i++) {
        if (this.tipoUsuario === 'Paciente') {
          this.savedFileNames = [];
          formArray.removeAt(0);
          const file = files[i];
          this.savedFileNames.push({ name: file.name });
          formArray.push(this.formBuilder.control(file));
        } else if (this.tipoUsuario === 'Profesional') {
          console.log(this.savedFileNames.length);
          if (this.savedFileNames.length > 1) {
            this.savedFileNames.pop();
            formArray.removeAt(1);
          }
          const file = files[i];
          this.savedFileNames.push({ name: file.name });
          formArray.push(this.formBuilder.control(file));
        }
      }
    }
  }

  onCheckboxChange() {
    this.formRegistro.reset();
    this.savedFileNames = [];
    if (this.isChecked) {
      this.tipoUsuario = 'Profesional';
      this.formRegistro.get('obrasocial')?.clearValidators();
      this.formRegistro.get('obrasocial')?.updateValueAndValidity();
      this.formRegistro.get('especialidad')?.addValidators(Validators.required);
      this.formRegistro.get('especialidad')?.updateValueAndValidity();
    } else {
      this.tipoUsuario = 'Paciente';
      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();
      this.formRegistro.get('obrasocial')?.addValidators(Validators.required);
      this.formRegistro.get('obrasocial')?.updateValueAndValidity();
    }
  }

  irLogin() {
    this.router.navigate(['/login']);
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
