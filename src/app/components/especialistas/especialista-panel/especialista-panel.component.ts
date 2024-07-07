import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EspecialistaService } from '../../../../services/especialista.service';
import { AuthService } from '../../../../services/auth.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from '../../../../pipes/filtro.pipe';
import { ColoresPipe } from '../../../../pipes/colores.pipe';
import { ColoresturnosPipe } from '../../../../pipes/coloresturnos.pipe';
import Swal from 'sweetalert2';
import { ConvertirfechaPipe } from '../../../../pipes/convertirfecha.pipe';

@Component({
  selector: 'app-especialista-panel',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    NgxPaginationModule,
    FormsModule,
    FiltroPipe,
    ReactiveFormsModule,
    ColoresturnosPipe,
    ConvertirfechaPipe,
  ],
  templateUrl: './especialista-panel.component.html',
  styleUrl: './especialista-panel.component.css',
})
export class EspecialistaPanelComponent implements OnInit {
  arrTurnos: any = [];
  p = 1;
  searchEspecialista = '';

  constructor(
    private especialistaService: EspecialistaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.especialistaService
      .obtenerTurnosEspecialista(this.authService.getUser()?.email!)
      .subscribe((data) => {
        this.arrTurnos = [];
        data.forEach((element: any) => {
          this.arrTurnos.push(element);
        });
      });
  }

  async gestionarTurno(turno: any) {
    if (turno.estado === 'cancelado') {
      Swal.fire('Turno ya cancelado', '', 'info');
      return;
    }

    if (turno.estado === 'rechazado') {
      Swal.fire('Turno ya rechazado', '', 'info');
      return;
    }

    if (turno.estado === 'realizado' || turno.reseniaOk === true) {
      if (turno.resenia == null) {
        Swal.fire(`No hay reseña por el momento`, '', 'info');
        return;
      }
      Swal.fire(`${turno.resenia}`, '', 'info');
      return;
    }

    if (turno.estado === 'aceptado') {
      Swal.fire({
        showCloseButton: true,
        title: 'Ingrese diagnostico y el comentario',
        html: `<input id="input1" class="swal2-input" placeholder="Comentario" required>' 
          <textarea  id="textarea1" class="swal2-textarea" style="resize: none;width:350px;" placeholder="Ingrese diagnostico" required></textarea>`,
        focusConfirm: false,
        preConfirm: () => {
          const input1 = (document.getElementById('input1') as HTMLInputElement)
            .value;
          const textarea1 = (
            document.getElementById('textarea1') as HTMLInputElement
          ).value;

          if (!input1 || !textarea1) {
            Swal.showValidationMessage(`Ingrese texto en ambos campos`);
          }

          return [textarea1, input1];
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.especialistaService.gestionarTurnoAceptado(
            turno.id,
            'realizado',
            result.value
          );
          Swal.fire({
            title: 'Turno realizado',
            icon: 'success',
          });
        }
      });
    }

    if (turno.estado === 'abierto') {
      Swal.fire({
        title: '¿Que desea hacer?',
        showCloseButton: true,
        showDenyButton: true,
        showCancelButton: true,
        cancelButtonText: `Rechazar turno`,
        confirmButtonText: `Aceptar turno`,
        denyButtonText: `Cancelar turno`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.especialistaService.gestionarTurno(turno.id, 'aceptado');
        } else if (result.isDenied) {
          Swal.fire({
            title: 'Motivo de cancelación',
            input: 'text',
            confirmButtonText: `Aceptar`,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.especialistaService.gestionarTurnoCancelado(
                turno.id,
                'cancelado',
                result.value
              );
            }
          });
        } else if (result.isDismissed) {
          Swal.fire({
            title: 'Motivo de rechazo de turno',
            input: 'text',
            confirmButtonText: `Aceptar`,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.especialistaService.gestionarTurnoCancelado(
                turno.id,
                'rechazado',
                result.value
              );
            }
          });
        }
      });
    }
  }

  agregarHistorialClinico(turno: any) {
    if (turno.historial === true) {
      Swal.fire('Historial clinico ya ingresado', '', 'info');
      return;
    }
    Swal.fire({
      showCloseButton: true,
      title: 'Ingrese datos del paciente',
      html: `<input id="input1" type="number" class="swal2-input" min="0" max="180" placeholder="Altura" required> 
        <input  id="input2" type="number" class="swal2-input" placeholder="Peso" min="0" max="380" required>
        <input  id="input3" type="number" class="swal2-input" min="0" max="60" placeholder="Presión" required>
        <input  id="input4"type="number"  class="swal2-input" min="0" max="48" placeholder="Temperatura" required>
      
        <input  id="input5" type="number" class="swal2-input" placeholder="Caries" min="0" max="10" required>`,

      focusConfirm: false,
      preConfirm: () => {
        const input1 = (document.getElementById('input1') as HTMLInputElement)
          .value;

        const input2 = (document.getElementById('input2') as HTMLInputElement)
          .value;

        const input3 = (document.getElementById('input3') as HTMLInputElement)
          .value;

        const input4 = (document.getElementById('input4') as HTMLInputElement)
          .value;

        const input5 = (document.getElementById('input5') as HTMLInputElement)
          .value;
        if (!input1 || !input2 || !input3 || !input4 || !input5) {
          Swal.showValidationMessage(`Ingrese texto requerido`);
        }

        return [input2, input1, input3, input4, !input5];
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.especialistaService
          .ingresarHistoriaClinicaTurnos(turno.id)
          .then(() =>
            this.especialistaService
              .ingresarHistoralClinico(
                turno.id,
                turno.medicoid,
                turno.paciente,
                result?.value!
              )
              .then(() => {
                Swal.fire({
                  title: 'Historial clinico ingresado',
                  icon: 'success',
                });
              })
          );
      }
    });
  }
}
