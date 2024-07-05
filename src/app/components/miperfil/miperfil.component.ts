import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { EspecialistaService } from '../../../services/especialista.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FormsModule],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css',
})
export class MiperfilComponent implements OnInit {
  user!: any;
  id!: string;
  auth: Auth = inject(Auth);
  constructor(
    private route: ActivatedRoute,
    private firestoreS: FirestoreService,
    private formBuilder: FormBuilder,
    private especilistaS: EspecialistaService
  ) {}
  fechaSeleccionada: Date | null = null;
  options = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  especialidades: string[] = [];
  formRegistro = new FormGroup({
    horario: this.formBuilder.array([]),
    especialidades: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.firestoreS
        .obtenerFirestoreUsuario(params['usuarios'])
        .then((user) => {
          this.user = user[0];
          console.log(this.user.especialidad);
          this.especialidades = this.user.especialidad;
        });
    });

    this.especilistaS
      .obtenerEspecialista(this.auth.currentUser?.email!)
      .subscribe((data) => {
        this.id = data[0].id;
      });
  }

  get horarios(): FormArray {
    return this.formRegistro.get('horario') as FormArray;
  }

  minDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Fecha actual en formato ISO (yyyy-mm-dd)
  }

  maxDate(): string {
    const max = new Date();
    max.setDate(max.getDate() + 15); // Suma 15 días a la fecha actual
    return max.toISOString().split('T')[0]; // Fecha máxima en formato ISO (yyyy-mm-dd)
  }

  obtenerFechaSeleccionada(event: Event): void {
    const fechaInput = event.target as HTMLInputElement;
    this.fechaSeleccionada = fechaInput.value as unknown as Date;
  }

  agregarHorario(): void {
    if (this.fechaSeleccionada === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debes seleccionar una fecha',
      });
      return;
    }
    const fechaSeleccionadaDate = new Date(this.fechaSeleccionada);
    const dia = fechaSeleccionadaDate.getDate();
    const mes = fechaSeleccionadaDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const anio = fechaSeleccionadaDate.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    // let horarios = this.options;
    const inputElement = document.getElementById('horario') as HTMLInputElement;
    const inputValue = inputElement.value;
    // this.options = horarios.filter((option) => option !== inputValue);
    const horarioFormateado = `${fechaFormateada} ${inputValue}`;

    if (inputValue) {
      this.horarios.push(
        new FormControl(
          `${horarioFormateado} - ${
            this.formRegistro.get('especialidades')?.value
          }`
        )
      );
      inputElement.value = '';
      this.fechaSeleccionada = null;
    }
  }

  async submitForm() {
    // (await this.especilistaS.obtenerEspecialista(this.user.email)).subscribe(
    //   (data) => {
    //     id = data[0].id;
    //   }
    // );

    this.firestoreS.actualizarHorasEspecialista(this.horarios.value, this.id);
    this.formRegistro.reset();
    this.horarios.clear();
  }
}
