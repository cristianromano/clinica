import { Component, OnInit } from '@angular/core';
import { EspecialistaService } from '../../../services/especialista.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PacienteService } from '../../../services/paciente.service';

interface Paciente {
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
        this.arrTurnos.forEach((element) => {
          this.pacienteS
            .obtenerFirestoreUsuarioPaciente(element.paciente)
            .then((data) => {
              this.arrPaciente = [];
              data.forEach((element: any) => {
                this.arrPaciente.push(element);
              });
            });
        });
      });
  }
}
