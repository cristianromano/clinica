import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FirestoreService } from '../../../services/firestore.service';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

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
  ) {}
  ngOnInit(): void {
    // console.log('hola' + this.user$);
    if (this.auth.currentUser?.email) {
      this.firestoreS
        .obtenerFirestoreUsuario(this.auth.currentUser?.email)
        .then((user) => {
          if (user.length > 0) {
            this.user = user[0];
            console.log(this.user);
          }
        });
    }
    // this.authS.user$.subscribe((user) => {
    //   this.user$ = user.email;
    //   console.log('a' + this.user$);
    // });
  }

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
