import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import * as XLSX from 'xlsx';
import { PacienteService } from '../../../services/paciente.service';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css',
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  arrUsuarios: any[] = [];
  subcription: Subscription[] = [];

  constructor(
    private firestoreS: FirestoreService,
    private pacienteS: PacienteService
  ) {}
  ngOnDestroy(): void {
    if (this.subcription) {
      this.subcription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }

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

  descargarUsuariosExcel() {
    let usuarios = this.arrUsuarios;
    let usuariosExcel: any = [];
    usuarios.forEach((usuario) => {
      usuariosExcel.push({
        Nombre: usuario.nombre,
        Apellido: usuario.apellido,
        Email: usuario.email,
        DNI: usuario.dni,
        Edad: usuario.edad,
        ObraSocial: usuario.obrasocial,
        Tipo: usuario.tipo,
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(usuariosExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');
    XLSX.writeFile(wb, 'Usuarios.xlsx');
  }

  descargarUsuarioPdf(item: any) {
    this.subcription.push(
      this.pacienteS.obtenerTurnosPaciente(item.email).subscribe((turnos) => {
        const doc = new jsPDF();
        turnos.forEach((turno, index) => {
          let turnoString = turno['hora'].toDate();
          let y = 30 + index * 60; // Increase the y position for each turno

          doc.text('Turnos Historicos', 10, 10);
          doc.text('Especialista: ' + turno['medicoemail'], 10, y);
          y += 10;
          doc.text('Especialidad: ' + turno['especialidad'], 10, y);
          y += 10;
          doc.text('Fecha: ' + turnoString, 10, y);
          y += 10;
          doc.text('Diagnostico: ' + turno['diagnostico'], 10, y);
          y += 10;
          doc.text('Comentario: ' + turno['comentario'], 10, y);
          y += 10;
          doc.text('----------------------------------------', 10, y);
          y += 10;
        });

        if (turnos.length > 0) {
          doc.save(`historial_${new Date().toLocaleTimeString()}.pdf`);
        } else {
          Swal.fire('No hay turnos para este paciente', '', 'info');
        }
      })
    );
  }
}
