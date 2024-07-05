import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FirestoreService } from '../../../../services/firestore.service';
import { FiltroPipe } from '../../../../pipes/filtro.pipe';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { PacienteService } from '../../../../services/paciente.service';
import { ColoresturnosPipe } from '../../../../pipes/coloresturnos.pipe';
import { EspecialistaService } from '../../../../services/especialista.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ConvertirfechaPipe } from '../../../../pipes/convertirfecha.pipe';

@Component({
  selector: 'app-paciente-turnos',
  standalone: true,
  templateUrl: './paciente-turnos.component.html',
  styleUrl: './paciente-turnos.component.css',
  imports: [
    CommonModule,
    NavbarComponent,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    FiltroPipe,
    ColoresturnosPipe,
    ConvertirfechaPipe,
  ],
  providers: [FiltroPipe],
})
export class PacienteTurnosComponent implements OnInit {
  p = 1;
  ptwo = 1;
  p3 = 1;
  arrProfesionales: any = [];
  arrTurnos: any = [];
  arrPacientes: any = [];
  usuarioElegidoEmail: string = '';
  user: any = [];
  opciones: any = [];
  fechas: any = [];
  constructor(
    private firestoreS: FirestoreService,
    private filtro: FiltroPipe,
    private pacienteS: PacienteService,
    private authS: AuthService,
    private especialistaS: EspecialistaService
  ) {}
  searchEspecialista = '';
  firestore: Firestore = inject(Firestore);
  selectedRow: number = -1;
  ngOnInit(): void {
    // this.firestoreS.obtenerFirestoreTodosProfesional().subscribe((data) => {
    //   this.arrProfesionales = [];
    //   data.forEach((element: any) => {
    //     this.arrProfesionales.push(element);
    //   });
    // });

    this.pacienteS
      .obtenerTurnosPorPaciente(this.authS.getUser()?.email!)
      .subscribe((data) => {
        this.arrTurnos = [];
        data.forEach((element: any) => {
          this.arrTurnos.push(element);
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

  getEspecialidadesOpciones(opcion: string, index: number) {
    this.firestoreS
      .obtenerEspecialistaPorEspecialidad(opcion)
      .subscribe((data) => {
        this.arrProfesionales = [];
        data.forEach((element: any) => {
          this.arrProfesionales.push(element);
        });
      });
  }

  elegirMedico(medico: any) {
    this.fechas = [];

    for (let index = 0; index < 2; index++) {
      this.fechas.push({
        especialidad: Object.keys(medico.fechas[index])[0],
        timestamp: Object.values(medico.fechas[index])[0],
        medico: medico.id,
      });
    }
  }

  elegirUsuario(user: any) {
    Swal.fire(`Usuario elegido:${user.email}`, '', 'success');
    this.usuarioElegidoEmail = user.email;
  }

  solicitarTurno(fecha: any) {
    Swal.fire({
      title: `¿Desea solicitar turno?`,
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialistaS.obtenerMedicoPorId(fecha.medico).then((medico) => {
          let email = '';
          let nombre = '';
          let apellido = '';
          medico.forEach((element: any) => {
            email = element.email;
            nombre = element.nombre;
            apellido = element.apellido;
          });

          this.pacienteS
            .ingresarTurnoPaciente(
              this.usuarioElegidoEmail
                ? this.usuarioElegidoEmail
                : this.authS.getUser()?.email,
              fecha.especialidad,
              fecha.medico,
              email,
              fecha.timestamp,
              nombre,
              apellido
            )
            .then(() => {
              Swal.fire(`Turno solicitado`, '', 'success');
              let horario = this.fechas.splice(this.fechas.indexOf(fecha), 1);

              this.usuarioElegidoEmail = '';
              this.especialistaS.actualizarHorario(fecha.medico, horario);
            });
        });
      } else if (result.isDenied) {
        Swal.fire('Turno no solicitado', '', 'info');
      }
    });
  }
  // solicitarTurno(medico: any) {
  //   // Obtener la fecha de hoy
  //   let today = new Date();
  //   let horariosValidos: Date[] = [];
  //   // Calcular la fecha máxima permitida (15 días después de hoy)
  //   let maxDate = new Date();
  //   maxDate.setDate(today.getDate() + 15);

  //   let horarios: any = [];
  //   medico.horario.forEach((element: any) => {
  //     horariosValidos.push(
  //       new Date(element.seconds * 1000 + element.nanoseconds / 1000000)
  //     ); // Convertir el timestamp a hora);
  //   });

  //   horariosValidos.forEach((fecha: any) => {
  //     if (fecha >= today && fecha <= maxDate) {
  //       horarios.push(fecha); // Conservar solo los horarios dentro del rango
  //     }
  //   });

  //   let inputOptions: { [key: string]: string } = {};

  //   horarios.forEach((element: any, index: number) => {
  //     inputOptions[
  //       index.toString()
  //     ] = `${element.getDate()}/${element.getMonth()} ${element.getHours()}:${element.getMinutes()}`;
  //   });

  //   // Construir el HTML para mostrar los radio buttons con sus etiquetas
  //   let html = 'Horarios disponibles:<br>';
  //   Object.keys(inputOptions).forEach((key) => {
  //     html += `<input type="radio" id="input${key}" name="hora" value="${key}" required>
  //              <label for="input${key}">${inputOptions[key]}</label><br>`;
  //   });

  //   if (horarios.length > 0) {
  //     Swal.fire({
  //       title: '¿Desea solicitar turno?',
  //       input: 'radio',
  //       html: html,
  //       showDenyButton: true,
  //       confirmButtonText: `Si`,
  //       denyButtonText: `No`,
  //       focusConfirm: false,
  //       preConfirm: () => {
  //         const selectedOption = (
  //           document.querySelector(
  //             'input[name="hora"]:checked'
  //           ) as HTMLInputElement
  //         )?.value;

  //         if (!selectedOption) {
  //           Swal.showValidationMessage(`Seleccione una opción`);
  //         }

  //         return selectedOption;
  //       },
  //     }).then((result) => {
  //       let fecha = horarios[result.value];
  //       let fechaFinal = `${fecha.getHours()}:${fecha.getMinutes()}`;
  //       console.log(fechaFinal);
  //       if (result.isConfirmed) {
  //         this.pacienteS.ingresarTurnoPaciente(
  //           this.usuarioElegidoEmail
  //             ? this.usuarioElegidoEmail
  //             : this.authS.getUser()?.email,
  //           medico,
  //           fechaFinal
  //         );
  //         this.usuarioElegidoEmail = '';
  //         horarios.splice(result.value, 1);
  //         this.especialistaS.actualizarHorario(medico.id, horarios);
  //         Swal.fire(`Turno solicitado`, '', 'success');
  //       } else if (result.isDenied) {
  //         Swal.fire('Turno no solicitado', '', 'info');
  //       }
  //     });
  //   } else {
  //     Swal.fire('No hay turnos para este especialista', '', 'error');
  //   }
  // }

  calificarMedico(turno: any) {
    if (turno.calificacion) {
      Swal.fire('Calificacion ya realizada', '', 'info');
      return;
    }
    Swal.fire({
      title: 'Califique al medico',
      input: 'radio',
      inputOptions: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
      },
      showDenyButton: true,
      confirmButtonText: `Calificar`,
      denyButtonText: `No calificar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteS
          .ingresarCalificacionMedico(turno.id, result.value)
          .then(() => {
            Swal.fire(`Calificacion:${result.value}`, '', 'success');
          });
      } else if (result.isDenied) {
        Swal.fire('Calificacion no realizada', '', 'info');
      }
    });
  }

  async realizarEncuesta(turno: any) {
    if (turno.encuesta) {
      Swal.fire('Encuesta ya realizada', '', 'info');
      return;
    }

    const { value: encuesta } = await Swal.fire({
      title: 'Realice encuesta',
      input: 'text',
      inputPlaceholder: 'Ingrese encuesta',
      showCancelButton: true,
      inputValidator: (result) => {
        return !result && 'Complete el campo con texto valido';
      },
    });

    if (encuesta) {
      this.pacienteS.ingresarEncuesta(turno.id, encuesta).then(() => {
        Swal.fire('Encuesta realizada', '', 'success');
      });
    } else {
      Swal.fire('Encuesta no realizada', '', 'info');
    }
  }

  manejoTurno(turno: any) {
    if (turno.estado === 'cancelado') {
      Swal.fire('Turno ya cancelado', '', 'info');
      return;
    }

    if (turno.estado === 'realizado') {
      if (turno.reseniaOk === true) {
        Swal.fire(`Reseña:${turno.comentario}`, '', 'info');
        return;
      } else {
        Swal.fire({
          title: '¿Desea agregar reseña?',
          showDenyButton: true,
          confirmButtonText: `Si`,
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Ingrese reseña',
              input: 'text',
              inputPlaceholder: 'Ingrese reseña',
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.pacienteS
                  .ingresarResenia(turno.id, result.value)
                  .then(() => {
                    Swal.fire('Reseña agregada', '', 'success');
                  });
              }
            });
          } else if (result.isDenied) {
            Swal.fire('Reseña no agregada', '', 'info');
          }
        });
      }
    }

    if (turno.estado === 'abierto') {
      Swal.fire({
        title: '¿Desea cancelar turno? , ingrese motivo:',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `No`,
        input: 'text',
      }).then((result) => {
        if (result.isConfirmed) {
          this.pacienteS.cancelarTurno(turno.id, result.value).then(() => {
            Swal.fire('Turno cancelado', '', 'success');
          });
        } else if (result.isDenied) {
          Swal.fire('Turno no cancelado', '', 'info');
        }
      });
    }
  }

  filtrarEspecialista() {
    this.arrProfesionales = this.filtro.transform(
      this.arrProfesionales,
      this.searchEspecialista
    );
  }
}
