import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Auth, user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routeTransition } from '../../animations/route-transition';
import { PacienteService } from '../../../services/paciente.service';
import { EspecialistaService } from '../../../services/especialista.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  auth: Auth = inject(Auth);
  user: any = {};
  subcription: Subscription[] = [];

  constructor(
    public outlet: RouterOutlet,
    private router: Router,
    public authS: AuthService,
    private firestoreS: FirestoreService,
    private pacientesS: PacienteService,
    private especialidadS: EspecialistaService
  ) {
    if (this.auth.currentUser?.email) {
      this.firestoreS
        .obtenerFirestoreUsuario(this.auth.currentUser?.email)
        .then((user) => {
          this.authS.userSubject.next(user[0]);

          if (user.length > 0) {
            this.user = user[0];
          }
        })
        .then(() => {
          if (this.user.tipo == 'administrador') {
            this.subcription.push(
              this.firestoreS
                .obtenerAdminPorEmail(this.user.email)
                .subscribe((admin) => {
                  this.firestoreS.logDeUsuario(admin[0]['email'], admin[0].id);
                })
            );
          }
          if (this.user.tipo == 'paciente') {
            this.subcription.push(
              this.pacientesS
                .obtenerPacientePorEmail(this.user.email)
                .subscribe((paciente) => {
                  this.firestoreS.logDeUsuario(
                    paciente[0]['email'],
                    paciente[0].id
                  );
                })
            );
          }
          if (this.user.tipo == 'profesional') {
            this.subcription.push(
              this.especialidadS
                .obtenerEspecialista(this.user.email)
                .subscribe((especialista) => {
                  this.firestoreS.logDeUsuario(
                    especialista[0]['email'],
                    especialista[0].id
                  );
                })
            );
          }
        });
    }
  }
  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.forEach((sub) => sub.unsubscribe());
    }
  }

  ngOnInit(): void {}

  irAdministracion() {
    this.router.navigate(['administracion']);
  }

  irTurnoPaciente() {
    this.router.navigate(['turnos/paciente']);
  }

  irPanelEspecialista() {
    this.router.navigate(['especialistas/panel']);
  }

  irTurnosAdmin() {
    this.router.navigate(['admin/turnos']);
  }
}
