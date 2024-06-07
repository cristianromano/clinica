import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);

  constructor(private firestoreS: FirestoreService) {}

  logueado() {
    return this.auth.currentUser;
  }

  async crearUsuario(
    email: string,
    password: string,
    foto: string,
    nombre: string
  ) {
    return await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((userCredential) => {
      sendEmailVerification(userCredential.user);
      updateProfile(userCredential.user, {
        photoURL: foto,
        displayName: nombre,
      });
    });
  }

  async logueo(email: string, password: string) {
    let user: any = [];
    user = await this.firestoreS.obtenerFirestoreUsuario(email);

    if (user[0].tipo == 'profesional' && user.length > 0) {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      let validado = this.verificarEmailValidadoProfesional(userCredential);

      return {
        autorizado: user[0].autorizado,
        tipo: user[0].tipo,
        validado: validado,
      };
    } else {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return this.verificarEmailValidado(userCredential);
    }
  }

  verificarEmailValidadoProfesional(userCredential: any) {
    return userCredential.user.emailVerified;
  }

  verificarEmailValidado(userCredential: any) {
    return {
      validado: userCredential.user.emailVerified,
      tipo: 'paciente',
    };
  }

  signOut() {
    return this.auth.signOut();
  }
}
