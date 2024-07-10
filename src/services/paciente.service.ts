import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
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

  ingresarTurnoPaciente(
    paciente: any,
    especialidad: string,
    medicoId: string,
    email: string,
    horario: string,
    nombre: string,
    apellido: string
  ) {
    return addDoc(collection(this.firestore, 'turnos'), {
      paciente: paciente,
      medico: nombre + ' ' + apellido,
      medicoid: medicoId,
      especialidad: especialidad,
      medicoemail: email,
      hora: horario,
      estado: 'abierto',
      fechaPedido: new Date(),
      reseniaOk: false,
      calificacion: null,
      encuesta: null,
      historial: false,
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

  async obtenerFirestoreUsuarioPaciente(email: string) {
    const querySnapshot: any = query(
      collection(this.firestore, 'pacientes'),
      where('email', '==', email)
    );

    const datos = await getDocs(querySnapshot);
    if (datos.empty) {
      return [];
    }

    return datos.docs.map((doc) => doc.data());
  }

  ingresarEncuesta(id: string, encuesta: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      encuesta: encuesta,
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

  ingresarCalificacionMedico(id: string, calificacion: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      calificacion: calificacion,
    });
  }

  obtenerHistorialClinico(email: string) {
    let q = query(
      collection(this.firestore, 'historial'),
      where('paciente', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }


  obtenerTurnosPaciente(email: string) {
    let q = query(
      collection(this.firestore, 'turnos'),
      where('paciente', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  obtenerPacientePorEmail(email: string) {
    let q = query(
      collection(this.firestore, 'pacientes'),
      where('email', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }
}
