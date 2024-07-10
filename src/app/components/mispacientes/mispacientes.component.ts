import { Component, inject, OnInit } from '@angular/core';
import { EspecialistaService } from '../../../services/especialista.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';

interface Paciente {
  nombre: string;
  email: string;
  imagenes: string;
}

@Component({
  selector: 'app-mispacientes',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mispacientes.component.html',
  styleUrl: './mispacientes.component.css',
})
export class MispacientesComponent implements OnInit {
  arrTurnos: any[] = [];
  router: Router = inject(Router);
  user: any = {};
  arrPaciente: Paciente[] = [];
  perfil: string = '';
  constructor(
    private especialistaS: EspecialistaService,
    private authS: AuthService,
    private pacienteS: PacienteService
  ) {}

  ngOnInit(): void {
    this.authS.user$.subscribe((user) => {
      this.user = user;
      this.perfil = this.user.tipo;
    });

    this.especialistaS
      .obtenerTurnosEspecialista(this.user.email)
      .subscribe((data) => {
        this.arrTurnos = [];
        data.forEach((element: any) => {
          this.arrTurnos.push(element);
        });

        this.arrTurnos.forEach((elementTurnos) => {
          this.arrPaciente = [];
          this.pacienteS
            .obtenerPacientePorEmail(elementTurnos.paciente)
            .subscribe((data) => {
              data.forEach((element: any) => {
                const pacienteExistente = this.arrPaciente.find(
                  (paciente) => paciente.email === element.email
                );
                if (!pacienteExistente) {
                  // Si no está, lo agregamos a arrPaciente
                  this.arrPaciente.push(element);
                }
              });
            });
          console.log(this.arrPaciente);
        });
      });
  }

  irHistorial(paciente: Paciente) {
    this.router.navigate(['/mihistorial', paciente.email]);
  }
}
