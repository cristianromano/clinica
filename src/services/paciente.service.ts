import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  getPacientes() {
    return getDocs(collection(this.firestore, 'pacientes'));
  }

  ingresarTurnoPaciente(paciente: any, medico: any) {
    return addDoc(collection(this.firestore, 'turnos'), {
      paciente: paciente,
      medico: medico.nombre + ' ' + medico.apellido,
      especialidad: medico.especialidad,
      hora: '10:00',
      estado: 'abierto',
      fechaPedido: new Date(),
      reseniaOk: false,
    });
  }

  obtenerTurnosPorPaciente(email: string) {
    let q = query(
      collection(this.firestore, 'turnos'),
      where('paciente', '==', email)
    );
    return collectionData(q, {
      idField: 'id',
    });
  }

  cancelarTurno(id: string, comentario: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: 'cancelado',
      comentario: comentario,
    });
  }

  ingresarResenia(id: string, resenia: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      resenia: resenia,
      reseniaOk: true,
    });
  }
}
