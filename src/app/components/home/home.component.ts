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
  user: any = [];
  constructor(
    private router: Router,
    private authS: AuthService,
    private firestoreS: FirestoreService
  ) {}
  ngOnInit(): void {
    if (this.auth.currentUser?.email) {
      this.firestoreS
        .obtenerFirestoreUsuarioAdmin(this.auth.currentUser?.email)
        .then((user) => {
          if (user.length > 0) {
            this.user = user[0];
            console.log(this.user);
          }
        });
    }
  }

  irAdministracion() {
    this.router.navigate(['administracion']);
  }
}
