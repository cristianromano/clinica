import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from '../../../../pipes/filtro.pipe';
import { ColoresturnosPipe } from '../../../../pipes/coloresturnos.pipe';
import Swal from 'sweetalert2';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-admin-turnos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    FiltroPipe,
    ColoresturnosPipe,
  ],
  templateUrl: './admin-turnos.component.html',
  styleUrl: './admin-turnos.component.css',
})
export class AdminTurnosComponent implements OnInit {
  constructor(private firestoreS: FirestoreService) {}
  arrTurnos: any = [];
  searchEspecialista = '';
  p = 1;
  ngOnInit(): void {
    this.firestoreS.obtenerTurnos().subscribe((data) => {
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

    if (turno.estado === 'abierto') {
      Swal.fire({
        title: '¿Que desea hacer?',
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: `Cancelar turno`,
      }).then((result) => {
        if (result.isDenied) {
          Swal.fire({
            title: 'Motivo de cancelación',
            input: 'text',
            confirmButtonText: `Aceptar`,
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              this.firestoreS.gestionarTurnoCancelado(
                turno.id,
                'cancelado',
                result.value
              );
            }
          });
        }
      });
    }
  }
}
