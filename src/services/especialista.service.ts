import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  where,
  query,
  collectionData,
  updateDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EspecialistaService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  obtenerTurnosEspecialista(email: string) {
    let q = query(
      collection(this.firestore, 'turnos'),
      where('medicoemail', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  gestionarTurno(id: string, estado: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: estado,
    });
  }

  gestionarTurnoCancelado(id: string, estado: string, comentario: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: estado,
      comentario: comentario,
    });
  }

  gestionarTurnoRechazado(id: string, estado: string, comentario: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: estado,
      comentario: comentario,
    });
  }

  gestionarTurnoAceptado(id: string, estado: string, comentario: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: estado,
      comentario: comentario[0],
      diagnostico: comentario[1],
    });
  }

  actualizarHorario(id: string, horario: Array<string>) {
    return updateDoc(doc(this.firestore, 'profesional', id), {
      horario: horario,
    });
  }

  obtenerEspecialista(email: string) {
    let q = query(
      collection(this.firestore, 'profesional'),
      where('email', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }
}
