import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  where,
  query,
  collectionData,
  updateDoc,
  doc,
  docData,
  deleteDoc,
  addDoc,
  getDoc,
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

  actualizarHorario(id: string, horario: Array<any>, fechas: Array<any>) {
    let fechaObjeto: any = [];
    let horarioEliminar: { [key: string]: Date };
    horarioEliminar = {
      [horario[0].especialidad]: horario[0].timestamp,
    };

    fechas.forEach((fecha) => {
      if (fecha[horario[0].especialidad] !== horario[0].timestamp) {
        fechaObjeto.push(fecha);
      }
    });

    updateDoc(doc(this.firestore, 'profesional', id), {
      fechas: fechaObjeto,
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

  obtenerEspecialistaPorEspecialidad(especialidad: string) {
    let q = query(
      collection(this.firestore, 'profesional'),
      where('especialidad', '==', especialidad)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  obtenerMedicoPorId(id: string) {
    return getDoc(doc(this.firestore, 'profesional', id));
  }

  ingresarHistoriaClinicaTurnos(turnoId: string) {
    return updateDoc(doc(this.firestore, 'turnos', turnoId), {
      historial: true,
    });
  }

  ingresarHistoralClinico(
    id: string,
    idMedico: string,
    emailPaciente: string,
    historial: any
  ) {
    console.log(historial);
    return addDoc(collection(this.firestore, 'historial'), {
      idTurno: id,
      medico: idMedico,
      paciente: emailPaciente,
      historial: {
        peso: historial[0],
        altura: historial[1],
        presion: historial[2],
        temperatura: historial[3],
        caries: { ['caries']: historial[4] },
      },
    });
  }

  obtenerHistorialClinico(id: string) {
    let q = query(
      collection(this.firestore, 'historial'),
      where('medico', '==', id)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  obtenerUsuarioPorEmail(email: string) {
    let q = query(
      collection(this.firestore, 'usuarios'),
      where('email', '==', email)
    );

    return collectionData(q, {
      idField: 'id',
    });
  }
}
