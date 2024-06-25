import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FirestoreService } from '../../../../services/firestore.service';
import { FiltroPipe } from '../../../../pipes/filtro.pipe';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { PacienteService } from '../../../../services/paciente.service';
import { ColoresturnosPipe } from '../../../../pipes/coloresturnos.pipe';

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
  ],
  providers: [FiltroPipe],
})
export class PacienteTurnosComponent implements OnInit {
  p = 1;
  ptwo = 1;
  arrProfesionales: any = [];
  arrTurnos: any = [];
  constructor(
    private firestoreS: FirestoreService,
    private filtro: FiltroPipe,
    private pacienteS: PacienteService,
    private authS: AuthService
  ) {}
  searchEspecialista = '';

  ngOnInit(): void {
    this.firestoreS.obtenerFirestoreTodosProfesional().subscribe((data) => {
      this.arrProfesionales = [];
      data.forEach((element: any) => {
        this.arrProfesionales.push(element);
      });
    });

    console.log(this.authS.getUser()?.email);
    this.pacienteS
      .obtenerTurnosPorPaciente(this.authS.getUser()?.email!)
      .subscribe((data) => {
        this.arrTurnos = [];
        data.forEach((element: any) => {
          console.log(element);
          this.arrTurnos.push(element);
        });
      });
  }

  solicitarTurno(medico: any) {
    Swal.fire({
      title: '¿Desea solicitar turno?',
      input: 'radio',
      inputOptions: {
        10: '10',
        11: '11',
      },
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteS.ingresarTurnoPaciente(
          this.authS.getUser()?.email,
          medico
        );
        Swal.fire(`Turno solicitado para las:${result.value}`, '', 'success');
      } else if (result.isDenied) {
        Swal.fire('Turno no solicitado', '', 'info');
      }
    });
  }

  manejoTurno(turno: any) {
    if (turno.estado === 'cancelado') {
      Swal.fire('Turno ya cancelado', '', 'info');
      return;
    }

    if (turno.estado === 'realizado') {
      if (turno.reseniaOk === true) {
        Swal.fire(`Reseña:${turno.resenia}`, '', 'info');
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