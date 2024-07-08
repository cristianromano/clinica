import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css',
})
export class ListaUsuariosComponent implements OnInit {
  arrUsuarios: any[] = [];

  constructor(private firestoreS: FirestoreService) {}

  ngOnInit(): void {
    this.firestoreS.obtenerFirestoreTodosPacientes().subscribe((usuarios) => {
      usuarios.forEach((usuario) => {
        this.arrUsuarios.push(usuario);
      });
    });

    this.firestoreS.obtenerFirestoreTodosProfesional().subscribe((usuarios) => {
      usuarios.forEach((usuario) => {
        this.arrUsuarios.push(usuario);
      });
    });
  }
}
