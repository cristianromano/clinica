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

  gestionarTurno(turno: any) {
    console.log(turno);
  }
}
