import { Component, Input, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Auth, user } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  auth: Auth = inject(Auth);
  user: any = {};

  constructor(
    private router: Router,
    public authS: AuthService,
    private firestoreS: FirestoreService
  ) {
    if (this.auth.currentUser?.email) {
      this.firestoreS
        .obtenerFirestoreUsuario(this.auth.currentUser?.email)
        .then((user) => {
          this.authS.userSubject.next(user[0]);

          if (user.length > 0) {
            this.user = user[0];
          }
        });
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
