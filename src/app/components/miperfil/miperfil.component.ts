import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-miperfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FormsModule],
  templateUrl: './miperfil.component.html',
  styleUrl: './miperfil.component.css',
})
export class MiperfilComponent implements OnInit {
  user!: User;
  constructor(
    private route: ActivatedRoute,
    private firestoreS: FirestoreService,
    private formBuilder: FormBuilder
  ) {}

  options = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

  formRegistro = new FormGroup({
    fecha: new FormControl(''),
    horario: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['usuarios']);
      this.firestoreS
        .obtenerFirestoreUsuario(params['usuarios'])
        .then((user) => {
          this.user = user[0] as unknown as User;
        });
    });
  }

  get horarios(): FormArray {
    return this.formRegistro.get('horario') as FormArray;
  }

  agregarHorario(): void {
    let horarios = this.options;
    const inputElement = document.getElementById('horario') as HTMLInputElement;
    const inputValue = inputElement.value;
    this.options = horarios.filter((option) => option !== inputValue);
    console.log(inputValue);
    if (inputValue) {
      this.horarios.push(new FormControl(inputValue));
      inputElement.value = '';
    }
  }

  submitForm() {
    console.log(this.formRegistro.value);
  }
}
