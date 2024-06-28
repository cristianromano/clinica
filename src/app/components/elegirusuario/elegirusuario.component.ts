import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elegirusuario',
  standalone: true,
  imports: [],
  templateUrl: './elegirusuario.component.html',
  styleUrl: './elegirusuario.component.css',
})
export class ElegirusuarioComponent implements OnInit {
  router: Router = inject(Router);
  constructor() {}

  ngOnInit() {}

  elegirUsuario(usuario: string) {
    this.router.navigate(['/registro', usuario]);
  }
}
