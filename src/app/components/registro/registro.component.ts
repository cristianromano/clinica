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
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
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
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import {
  RECAPTCHA_V3_SITE_KEY,
  ReCaptchaV3Service,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaV3Module,
} from 'ng-recaptcha';

interface Opciones {
  etiqueta: string;
  valor: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
    FormsModule,
    BlockUIModule,
    RecaptchaModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  opciones: Opciones[] = [];
  response?: string;
  storage: Storage = inject(Storage);
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storageUpload = getStorage();
  token = '';
  recaptchaV3Service = inject(ReCaptchaV3Service);

  savedFileNames: any = [];
  tipoUsuario: string = '';
  isChecked: boolean = false;
  router: Router = inject(Router);
  tipoForm: any;
  datoRecibido?: string;
  selectedOption?: Opciones;
  selectedRow?: number;

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
    especialidad: this.formBuilder.array([]),
    password: new FormControl('', [Validators.required]),
    imagenes: this.formBuilder.array([]),
  });

  formEspecialidad = new FormGroup({
    especialidadextra: new FormControl('', [Validators.pattern('[a-zA-Z ]*')]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.tipoUsuario = params.get('usuario')!;
    });
  }

  ngOnInit(): void {
    collectionData(collection(this.firestore, 'especialidades')).subscribe(
      (especialidades) => {
        this.opciones = [];
        especialidades.forEach((especialidad) => {
          this.opciones.push({
            etiqueta: especialidad['especialidad'],
            valor: especialidad['especialidad'],
          });
        });
      }
    );

    this.onCheckboxChange();
  }

  executeReCaptchaV3(token: any) {
    this.token = token;
  }

  abc(opcion: string) {
    console.log(opcion);
  }
  getEspecialidadesOpciones(opcion: string, index: number) {
    this.selectedRow = index;

    Swal.fire({
      title: `Especialidad ${opcion} agregada`,
      text: opcion,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    this.formRegistro.get('especialidad') as FormArray;
    const formArray = this.formRegistro.get('especialidad') as FormArray;
    formArray.push(this.formBuilder.control(opcion));
    console.log(this.formRegistro.value.especialidad);
  }

  async submitForm() {
    this.blockUI.start('Ingresando datos a la base de datos...');
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
    const nombre = this.formRegistro.get('nombre')?.value;

    if (this.tipoUsuario === 'paciente') {
      if (email && password && nombre) {
        this.authService
          .crearUsuario(email, password, url[0], nombre)
          .then((user) => {
            this.firestoreService
              .agregarFirestorePaciente(this.formRegistro, url[0])
              .then(() => {
                this.blockUI.stop();
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
            this.blockUI.stop();
            let rta = this.firebaseErrors(error.code);
            Swal.fire({
              title: 'Error',
              text: rta,
              icon: 'error',
              confirmButtonText: 'Aceptar',
            });
          });
      }
    } else {
      if (email && password && nombre) {
        console.log(this.formRegistro.value);
        this.authService
          .crearUsuario(email, password, url[0], nombre)
          .then((user) => {
            this.firestoreService
              .agregarFirestoreProfesional(this.formRegistro, url)
              .then(() => {
                this.blockUI.stop();
                this.savedFileNames = [];
                this.formRegistro.reset();
                Swal.fire({
                  title: 'Registro exitoso',
                  text: 'Se ha registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                });
              });
            this.router.navigate(['/elegirusuario']);
          })
          .catch((error) => {
            this.blockUI.stop();
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

  async agregarEspecialidad() {
    let rta;
    this.blockUI.start('Agregando especialidad...');
    const especialidad = this.formEspecialidad.get('especialidadextra')?.value;
    if (especialidad) {
      rta = await this.firestoreService.obtenerFirestoreEspecialidades(
        especialidad
      );
    }

    if (rta) {
      this.blockUI.stop();
      Swal.fire({
        title: 'Error',
        text: 'La especialidad ya existe',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } else {
      if (this.formEspecialidad.get('especialidadextra')?.value !== '') {
        addDoc(collection(this.firestore, 'especialidades'), {
          especialidad: this.formEspecialidad.get('especialidadextra')?.value,
        }).then(() => {
          this.blockUI.stop();
          Swal.fire({
            title: 'Especialidad agregada',
            text: 'Se ha agregado la especialidad correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.formEspecialidad.reset();
        });
      } else {
        this.blockUI.stop();
        Swal.fire({
          title: 'Error',
          text: 'Debe ingresar una especialidad',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    }
  }

  onFileChange(event: any) {
    let files = event.target.files;
    if (files) {
      const formArray = this.formRegistro.get('imagenes') as FormArray;
      for (let i = 0; i < files.length; i++) {
        if (this.tipoUsuario === 'paciente') {
          this.savedFileNames = [];
          formArray.removeAt(0);
          const file = files[i];
          this.savedFileNames.push({ name: file.name });
          formArray.push(this.formBuilder.control(file));
        } else if (this.tipoUsuario === 'especialista') {
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
    this.savedFileNames = [];
    if (this.tipoUsuario === 'especialista') {
      this.formRegistro.get('obrasocial')?.clearValidators();
      this.formRegistro.get('obrasocial')?.updateValueAndValidity();
      this.formRegistro.get('especialidad')?.addValidators(Validators.required);
      this.formRegistro.get('especialidad')?.updateValueAndValidity();
    } else {
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
