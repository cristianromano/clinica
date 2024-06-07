import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  auth: Auth = inject(Auth);
  nombre?: any;
  foto?: any;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log('No hay usuario');
      } else {
        this.nombre = user.email;
        this.foto = user.photoURL;
      }
    });
  }

  irBio() {
    this.route.navigate(['/bio']);
  }

  logOut() {
    this.auth.signOut();
    this.route.navigate(['/login']);
  }
}
