import { Injectable, inject } from '@angular/core';
import { DeferBlockBehavior } from '@angular/core/testing';
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
  and,
} from '@angular/fire/firestore';
import { timestamp } from 'rxjs';

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

  actualizarHorario(id: string, horario: any, fechas: any) {
    let fechaObjeto: any = [];
    let arrFechas: any = [];

    for (let index = 0; index < fechas[0].length; index++) {
      let timestamp = Object.values(fechas[0][index])[0];
      debugger;
      if (timestamp !== horario.timestamp) {
        fechaObjeto.push({
          [Object.keys(fechas[0][index])[0]]: Object.values(
            fechas[0][index]
          )[0],
        });
      }
    }

    updateDoc(doc(this.firestore, 'profesional', id), {
      fechas: [...fechaObjeto],
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

  obtenerTurnosTotal() {
    let q = query(collection(this.firestore, 'turnos'));

    return collectionData(q, {
      idField: 'id',
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

  obtenerTurnoPorId(id: string) {
    return getDoc(doc(this.firestore, 'turnos', id));
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

  convertDateToTimestamp(date: any) {
    if (!(date instanceof Date)) {
      throw new Error('Invalid Date object');
    }

    const seconds = Math.floor(date.getTime() / 1000);
    const nanoseconds = (date.getTime() % 1000) * 1e6;

    return {
      seconds: seconds,
      nanoseconds: nanoseconds,
    };
  }

  obtenerTurnosMedicoMes() {
    let mes = new Date().getMonth();
    let newdDate = new Date(new Date().getFullYear(), mes, 1);
    let dosSemanasDelMes = new Date(new Date().getFullYear(), mes, 15);
    let q = query(
      collection(this.firestore, 'turnos'),
      and(
        where('fechaPedido', '>', newdDate),
        where('fechaPedido', '<', dosSemanasDelMes)
      )
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  obtenerTurnosMedicoDosSemanasFinalizados() {
    let mes = new Date().getMonth();
    let newdDate = new Date(new Date().getFullYear(), mes, 1);
    let dosSemanasDelMes = new Date(new Date().getFullYear(), mes, 15);
    let q = query(
      collection(this.firestore, 'turnos'),
      and(
        where('fechaPedido', '>', newdDate),
        where('fechaPedido', '<', dosSemanasDelMes),
        where('estado', '==', 'realizado')
      )
    );

    return collectionData(q, {
      idField: 'id',
    });
  }

  obtenerLogUsuarios(){
    let q = query(collection(this.firestore, 'log'));

    return collectionData(q, {
      idField: 'id',
    });
  }
}
