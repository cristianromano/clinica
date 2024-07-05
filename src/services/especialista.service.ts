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

  async actualizarHorario(id: string, horario: Array<any>) {
    let horarios: any = [];
    horarios.push({ [horario[0].especialidad]: horario[0].timestamp });
    let fechas: any = [];
    let iterador = 0;
    await this.obtenerMedicoPorId(id).then((medico) => {
      // Asignar fechas dentro del bloque `then`
      if (medico) {
        medico.forEach((item: any) => {
          item.fechas.forEach((fecha: any) => {
            iterador++;
            console.log(Object.keys(fecha[iterador])[0]);
          });
          // console.log(Object.keys(item.fechas[0])[0]);
        });

        for (let index = 0; index < medico.fechas.length; index++) {
          if (
            Object.keys(medico.fechas[index])[0] === horario[0].especialidad
          ) {
            console.log('entro al if');
          }
          // fechas.push(medico.fechas[index]);
        }
      }
    });

    // for (let index = 0; index < 2; index++) {
    //   fechas.push({
    //     especialidad: Object.keys(medico.fechas[index])[0],
    //     timestamp: Object.values(medico.fechas[index])[0],
    //     medico: medico.id,
    //   });
    // }

    // updateDoc(doc(this.firestore, 'profesional', id), {
    //   fechas: fechas,
    // });
    console.log(fechas);
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

  async obtenerMedicoPorId(id: string) {
    let medico: any;
    medico = docData(doc(this.firestore, 'profesional', id));

    return medico;
  }
}
