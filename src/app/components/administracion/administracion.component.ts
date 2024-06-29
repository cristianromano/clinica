import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { ColoresPipe } from '../../../pipes/colores.pipe';
import { AuthService } from '../../../services/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    ReactiveFormsModule,
    ColoresPipe,
    NgxPaginationModule,
    FormsModule,
    BlockUIModule,
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css',
})
export class AdministracionComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  p: number = 1;
  pageTwo: number = 1;
  $index: any;
  firestore: Firestore = inject(Firestore);
  constructor(
    private firestoreS: FirestoreService,
    private formBuilder: FormBuilder,
    private authS: AuthService
  ) {}
  arrEspecialistas: any = [];
  arrPacientes: any = [];
  savedFileNames: any = [];
  storage: Storage = inject(Storage);
  opciones: any = [];
  roles: string[] = ['Paciente', 'Administrador', 'Especialista'];
  selectedRole: string = this.roles[0];

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
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
    ]),
    obrasocial: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    especialidad: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    imagenes: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.firestoreS
      .obtenerFirestoreTodosProfesional()
      .subscribe((especialistas) => {
        this.arrEspecialistas = [];
        especialistas.forEach((especialista: any) => {
          this.arrEspecialistas.push(especialista);
        });
      });

    this.firestoreS.obtenerFirestoreTodosPacientes().subscribe((pacientes) => {
      this.arrPacientes = [];
      pacientes.forEach((paciente: any) => {
        this.arrPacientes.push(paciente);
      });
    });

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
  }

  autorizarProfesional(profesional: any) {
    this.firestoreS.autorizarProfesional(profesional);
  }

  cambioRol(event: any) {
    this.selectedRole = event.target.value;
    this.formRegistro.reset();
    if (this.selectedRole === 'Paciente') {
      this.formRegistro.get('especialidad')?.clearValidators();
      this.formRegistro.get('especialidad')?.updateValueAndValidity();
      this.formRegistro.get('obrasocial')?.addValidators(Validators.required);
      this.formRegistro.get('obrasocial')?.updateValueAndValidity();
    } else if (this.selectedRole === 'Especialista') {
      this.formRegistro.get('obrasocial')?.clearValidators();
      this.formRegistro.get('obrasocial')?.updateValueAndValidity();
      this.formRegistro.get('especialidad')?.addValidators(Validators.required);
      this.formRegistro.get('especialidad')?.updateValueAndValidity();
    }
  }

  async submit() {
    this.blockUI.start('Registrando usuario...');
    const formArray = this.formRegistro.get('imagenes') as FormArray;
    let url: string | string[] = [];
    let nombre = this.formRegistro.value.nombre;
    let email = this.formRegistro.value.email;
    let password = this.formRegistro.value.password;

    for (const control of formArray.controls) {
      if (control.value !== '') {
        const fileRef = ref(this.storage, `imagenes/${control.value.name}`);
        await uploadBytesResumable(fileRef, control.value).then(
          async (snapshot) => {
            url.push(await getDownloadURL(snapshot.ref));
            if (this.selectedRole === 'Paciente') {
              this.firestoreS
                .agregarFirestorePaciente(this.formRegistro, url[0])
                .then((res) => {
                  if (nombre && email && password) {
                    this.authS
                      .crearUsuario(email, password, url[0], nombre)
                      .then((res) => {
                        this.blockUI.stop();
                        this.formRegistro.reset();
                        this.savedFileNames = [];
                        Swal.fire({
                          title: 'Registro exitoso',
                          text: 'Se ha registrado correctamente',
                          icon: 'success',
                          confirmButtonText: 'Aceptar',
                        });
                      });
                  }
                });
            } else if (this.selectedRole === 'Especialista') {
              this.firestoreS
                .agregarFirestoreProfesional(this.formRegistro, url)
                .then((res) => {
                  if (nombre && email && password) {
                    this.authS
                      .crearUsuario(email, password, url[0], nombre)
                      .then((res) => {
                        this.blockUI.stop();
                        this.formRegistro.reset();
                        this.savedFileNames = [];
                        Swal.fire({
                          title: 'Registro exitoso',
                          text: 'Se ha registrado correctamente',
                          icon: 'success',
                          confirmButtonText: 'Aceptar',
                        });
                      });
                  }
                });
            } else {
              this.firestoreS
                .agregarFirestoreAdministrador(this.formRegistro, url)
                .then((res) => {
                  if (nombre && email && password) {
                    this.authS
                      .crearUsuarioAdmin(email, password, url[0], nombre)
                      .then((res) => {
                        this.blockUI.stop();
                        this.formRegistro.reset();
                        this.savedFileNames = [];
                        Swal.fire({
                          title: 'Registro exitoso',
                          text: 'Se ha registrado correctamente',
                          icon: 'success',
                          confirmButtonText: 'Aceptar',
                        });
                      });
                  }
                });
            }
          }
        );
      }
    }
  }

  onFileChange(event: any) {
    let files = event.target.files;
    if (files && files.length > 0) {
      const formArray = this.formRegistro.get('imagenes') as FormArray;
      formArray.clear(); // Remove any existing images
      let file = files[0]; // Only take the first file
      this.savedFileNames = [{ name: file.name }]; // Update the saved file name
      formArray.push(this.formBuilder.control(file));
    }
  }
}
