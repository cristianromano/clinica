import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css',
})
export class BienvenidoComponent {
  constructor() {}
  router: Router = inject(Router);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  irRegistro() {
    this.router.navigate(['/registro']);
  }
}
