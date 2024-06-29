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

  constructor(private route: Router, private authS: AuthService) {}

  ngOnInit(): void {
    let user = this.authS.logueado();
    if (user) {
      this.nombre = user.email;
      this.foto = user.photoURL;
    }
  }

  irBio() {
    this.route.navigate(['/bio']);
  }

  logOut() {
    this.authS.signOut();
    this.route.navigate(['/login']);
  }
}
