import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { EspecialistaService } from '../../../services/especialista.service';
import { Auth } from '@angular/fire/auth';
import { BuscarMiPefilPipe } from '../../../pipes/buscar-mi-pefil.pipe';

interface Fechas {
  fecha: string;
}

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    FormsModule,
    BuscarMiPefilPipe,
  ],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css',
})
export class MiperfilComponent implements OnInit, OnDestroy {
  user!: any;
  id!: string;
  auth: Auth = inject(Auth);
  perfil!: string;
  dias: string[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  arrHistorial: any = [];
  searchAll = '';
  arrTurnosMedico: Fechas[] = [];
  constructor(
    private route: ActivatedRoute,
    private firestoreS: FirestoreService,
    private formBuilder: FormBuilder,
    private especilistaS: EspecialistaService
  ) {}

  ngOnDestroy(): void {}

  tieneData: boolean = true;

  especialidades: string[] = [];
  formRegistro = new FormGroup({
    dias: new FormControl(''),
    horario: new FormControl(''),
    especialidades: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.firestoreS
        .obtenerFirestoreUsuario(params['usuarios'])
        .then((user) => {
          this.user = user[0];
          this.perfil = this.user.tipo;
          this.especialidades = this.user.especialidad;
        })
        .then(() => {
          if (this.user.tipo === 'profesional') {
            this.especilistaS
              .obtenerEspecialista(this.user.email)
              .subscribe((data) => {
                this.id = data[0].id;
                this.especilistaS
                  .obtenerHistorialClinico(data[0].id)
                  .subscribe((historial) => {
                    this.arrHistorial = [];
                    historial.forEach((element: any) => {
                      this.arrHistorial.push(element);
                    });
                  });
              });
          }
        });
    });
  }

  agregarFecha(): void {
    let dia = this.formRegistro.get('dias')?.value;
    let hora = this.formRegistro.get('horario')?.value;
    let especialidad = this.formRegistro.get('especialidades')?.value;

    let horaInt = Number(hora!.split(':')[0]);

    if (hora !== undefined && hora !== null && horaInt > 8 && horaInt < 18) {
      if (dia === 'Sabado') {
        if (horaInt > 14) {
          Swal.fire(
            'Horario incorrecto',
            'El horario debe ser entre las 8 y las 13',
            'error'
          );
          return;
        }
      }
      if (dia && hora && especialidad) {
        this.firestoreS
          .actualizarHorasEspecialista(
            dia,
            hora.split(':')[0],
            hora.split(':')[1],
            especialidad,
            this.id
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Se agrego el horario mensual correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          });

        this.formRegistro.reset();
      }
    } else {
      Swal.fire(
        'Horario incorrecto',
        'Fijarse los datos ingresados como el horario y el dia seleccionado',
        'error'
      );
      return;
    }
  }

  async submitForm() {
    console.log(this.arrTurnosMedico);
    // this.firestoreS.actualizarHorasEspecialista(this.arrTurnosMedico, this.id);
    // this.formRegistro.reset();
  }
}
