import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  auth: Auth = inject(Auth);
  nombre?: any;
  foto?: any;
  router: Router = inject(Router);
  user: any;
  constructor(private route: Router, private authS: AuthService) {}

  ngOnInit(): void {
    this.user = this.authS.logueado();
    if (this.user) {
      this.nombre = this.user.email;
      this.foto = this.user.photoURL;
    }
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
}
