import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async agregarFirestorePaciente(data: any, url: string) {
    await addDoc(collection(this.firestore, 'paciente'), {
      nombre: data.get('nombre')?.value,
      apellido: data.get('apellido')?.value,
      edad: data.get('edad')?.value,
      dni: data.get('dni')?.value,
      obrasocial: data.get('obrasocial')?.value,
      email: data.get('email')?.value,
      password: data.get('password')?.value,
      imagenes: url,
      tipo: 'paciente',
      fecha: new Date(),
    });
  }

  async agregarFirestoreProfesional(data: any, url: string) {
    await addDoc(collection(this.firestore, 'profesional'), {
      nombre: data.get('nombre')?.value,
      apellido: data.get('apellido')?.value,
      edad: data.get('edad')?.value,
      dni: data.get('dni')?.value,
      especialidad: data.get('especialidad')?.value,
      email: data.get('email')?.value,
      password: data.get('password')?.value,
      imagenes: url,
      tipo: 'profesional',
      fecha: new Date(),
    });
  }

  obtenerFirestore(tipo: string) {
    return collection(this.firestore, 'tipo');
  }
}
