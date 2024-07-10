import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from '../../../services/paciente.service';

@Component({
  selector: 'app-mihistorial',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mihistorial.component.html',
  styleUrl: './mihistorial.component.css',
})
export class MihistorialComponent implements OnInit {
  arrHistoriales: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private pacienteS: PacienteService
  ) {
    this.arrHistoriales = [];
    this.route.params.subscribe((params) => {
      this.pacienteS.obtenerHistorialClinico(params['id']).subscribe((data) => {
        data.forEach((element: any) => {
          this.arrHistoriales.push(element);
        });
      });
    });
  }

  ngOnInit() {}
}
