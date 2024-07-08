import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  auth: Auth = inject(Auth);
  nombre?: any;
  foto?: any;
  router: Router = inject(Router);
  user: any;
  userPadre?: any;

  constructor(private route: Router, private authS: AuthService) {}

  ngOnInit(): void {
    this.user = this.authS.logueado();
    if (this.user) {
      this.nombre = this.user.email;
      this.foto = this.user.photoURL;
    }
    this.authS.user$.subscribe((user) => {
      this.userPadre = user;
      console.log(this.userPadre);
    });
  }

  irBio() {
    this.route.navigate(['/bio']);
  }

  logOut() {
    this.authS.signOut();
    this.route.navigate(['/login']);
  }

  irPefil() {
    this.router.navigate(['miperfil', `${this.user.email}`]);
  }

  irMisPaciente() {
    this.router.navigate(['mispacientes']);
  }

  irListaUsuarios() {
    this.router.navigate(['lista-usuarios']);
  }
}
