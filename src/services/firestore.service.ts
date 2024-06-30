import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  UpdateData,
  query,
  where,
  collectionData,
  and,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  async agregarFirestorePaciente(data: any, url: string) {
    await addDoc(collection(this.firestore, 'pacientes'), {
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

  async agregarFirestoreProfesional(data: any, url: Array<string>) {
    const dni = data.get('dni')?.value;

    const registro = await this.obtenerFirestore('profesional');
    let docEncontrado = false;

    registro.forEach((doc) => {
      if (doc.data()['dni'] == dni) {
        docEncontrado = true;
        updateDoc(doc.ref, {
          imagenes: url,
        });
      }
    });

    if (!docEncontrado) {
      addDoc(collection(this.firestore, 'profesional'), {
        nombre: data.get('nombre')?.value,
        apellido: data.get('apellido')?.value,
        edad: data.get('edad')?.value,
        dni: data.get('dni')?.value,
        especialidad: data.get('especialidad')?.value,
        email: data.get('email')?.value,
        password: data.get('password')?.value,
        imagenes: url,
        tipo: 'profesional',
        autorizado: false,
        fecha: new Date(),
      });
    }
  }

  async agregarFirestoreAdministrador(data: any, url: Array<string>) {
    addDoc(collection(this.firestore, 'administradores'), {
      nombre: data.get('nombre')?.value,
      apellido: data.get('apellido')?.value,
      edad: data.get('edad')?.value,
      dni: data.get('dni')?.value,
      email: data.get('email')?.value,
      password: data.get('password')?.value,
      imagenes: url,
      tipo: 'administrador',
      fecha: new Date(),
    });
  }

  async obtenerFirestoreUsuario(email: string) {
    const querySnapshotEmail: any = query(
      collection(this.firestore, 'profesional'),
      where('email', '==', email)
    );

    const querySnapshotAutorizado: any = query(
      collection(this.firestore, 'profesional'),
      where('email', '==', email),
      where('autorizado', '==', true)
    );

    const datos = await getDocs(querySnapshotEmail);
    if (datos.empty) {
      let paciente =
        (await this.obtenerFirestoreUsuarioPaciente(email)).length > 0;
      if (paciente == false) {
        return this.obtenerFirestoreUsuarioAdmin(email);
      } else {
        return this.obtenerFirestoreUsuarioPaciente(email);
      }
    } else {
      return datos.docs.map((doc) => doc.data());
    }
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

  async obtenerFirestoreUsuarioAdmin(email: string) {
    const querySnapshot: any = query(
      collection(this.firestore, 'administradores'),
      where('email', '==', email)
    );

    const datos = await getDocs(querySnapshot);
    if (datos.empty) {
      return [];
    }

    return datos.docs.map((doc) => doc.data());
  }

  obtenerFirestore(tipo: string) {
    return getDocs(collection(this.firestore, tipo));
  }

  async obtenerFirestoreEspecialidades(especialidad: string) {
    let firestoreQuery: any = query(
      collection(this.firestore, 'especialidades'),
      where('especialidad', '==', especialidad)
    );

    const especialidades = (await getDocs(firestoreQuery)).empty;
    if (especialidades == false) {
      return true;
    }
    return false;
  }

  autorizarProfesional(profesional: any) {
    if (profesional.autorizado == false) {
      updateDoc(doc(this.firestore, 'profesional', profesional.id), {
        autorizado: true,
      });
    } else {
      updateDoc(doc(this.firestore, 'profesional', profesional.id), {
        autorizado: false,
      });
    }
  }

  obtenerFirestoreTodosProfesional() {
    return collectionData(collection(this.firestore, 'profesional'), {
      idField: 'id',
    });
  }
  obtenerFirestoreTodosPacientes() {
    return collectionData(collection(this.firestore, 'pacientes'), {
      idField: 'id',
    });
  }

  gestionarTurnoCancelado(id: string, estado: string, comentario: string) {
    return updateDoc(doc(this.firestore, 'turnos', id), {
      estado: estado,
      comentario: comentario,
    });
  }

  obtenerTurnos() {
    return collectionData(collection(this.firestore, 'turnos'), {
      idField: 'id',
    });
  }
  async obtenerUsuarioPorID(id: string) {
    let docUser;
    let docRef = doc(this.firestore, `administradores/${id}`);
    docData(docRef).subscribe((doc) => {
      docUser = doc;
    });
    return docUser; // Return an empty observable
  }

  actualizarHorasEspecialista(horas: Array<string>, id: string) {
    updateDoc(doc(this.firestore, 'profesional', id), {
      horario: horas,
    });
  }
}
