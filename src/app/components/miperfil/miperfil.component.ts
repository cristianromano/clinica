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
import { AuthService } from '../../../services/auth.service';
import { PacienteService } from '../../../services/paciente.service';
import { jsPDF } from 'jspdf';

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
  tipo = '';
  email = '';
  nombre = '';
  constructor(
    private route: ActivatedRoute,
    private firestoreS: FirestoreService,
    private formBuilder: FormBuilder,
    private especilistaS: EspecialistaService,
    private authS: AuthService,
    private pacienteS: PacienteService
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
    this.authS.user$.subscribe((user) => {
      this.tipo = user.tipo;
      this.email = user.email;
      this.nombre = user.nombre;
    });
    this.route.params.subscribe((params) => {
      console.log(params['usuarios']);
      if (this.tipo === 'profesional') {
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
      } else if (this.tipo === 'paciente') {
        this.pacienteS.obtenerHistorialClinico(this.email).subscribe((data) => {
          this.arrHistorial = [];
          data.forEach((element: any) => {
            this.especilistaS
              .obtenerTurnoPorId(element.idTurno)
              .then((data) => {
                this.arrHistorial.push({
                  ...element,
                  especialidad: data.data()?.['especialidad'],
                  medico: data.data()?.['medico'],
                });
              });
          });
        });
      }
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

  descargarHistorial(item: any) {
    let medico = '';
    let medicoemail = '';
    let especialidad = '';
    this.especilistaS.obtenerMedicoPorId(item.medico).then((data) => {
      medico = data.data()?.['nombre'] + ' ' + data.data()?.['apellido'];
      medicoemail = data.data()?.['email'];
      especialidad = data.data()?.['especialidad'];
      let caries = item.historial.caries.caries
        ? item.historial.caries.caries
        : 'no tiene';

      this.especilistaS.obtenerTurnoPorId(item.idTurno).then((data) => {
        let turno = data.data();

        const doc = new jsPDF();
        let y = 10;
        doc.addImage('/assets/logo.png', 'PNG', 10, y, 20, 20);
        y += 30;
        doc.text('Fecha de emision: ' + new Date().toLocaleTimeString(), 10, y);
        y += 10;
        doc.text('Historial Clinico de ' + item.paciente, 10, y);
        doc.setFont('bold');
        doc.setFont('normal');
        y += 10;
        doc.text('idTurno: ' + item.idTurno, 10, y);
        y += 10;
        doc.text('Especialista: ' + medico, 10, y);
        y += 10;
        doc.text('Especialista email: ' + medicoemail, 10, y);
        y += 10;
        doc.text('Especialidad: ' + turno?.['especialidad'], 10, y);
        y += 10;
        doc.text('Comentario: ' + turno?.['comentario'], 10, y);
        y += 10;
        doc.text('Diagnostico: ' + turno?.['diagnostico'], 10, y);
        y += 10;
        doc.text('Paciente: ' + item.paciente, 10, y);
        y += 10;
        doc.text('Altura: ' + item.historial.altura + ' cms', 10, y);
        y += 10;
        doc.text('Peso: ' + item.historial.peso + ' kgs', 10, y);
        y += 10;
        doc.text('Presion: ' + item.historial.presion + ' mmHg', 10, y);
        y += 10;
        doc.text('Temperatura: ' + item.historial.temperatura + ' °C', 10, y);
        y += 10;
        doc.text('Caries: ' + caries, 10, y);

        doc.save(`historial_${new Date().toLocaleTimeString()}.pdf`);
      });
    });

    Swal.fire({
      icon: 'success',
      title: 'Se descargo el historial correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  async submitForm() {
    console.log(this.arrTurnosMedico);
    // this.firestoreS.actualizarHorasEspecialista(this.arrTurnosMedico, this.id);
    // this.formRegistro.reset();
  }
}
