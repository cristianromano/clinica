import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);

  constructor() {}

  logueado() {
    return this.auth.currentUser;
  }

  async crearUsuario(email: string, password: string, foto: string) {
    return await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then((userCredential) => {
      sendEmailVerification(userCredential.user);
      updateProfile(userCredential.user, {
        photoURL: foto,
      });
    });
  }

  async logueo(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return this.verificarEmailValidado(userCredential);
  }

  verificarEmailValidado(userCredential: any) {
    return userCredential.user.emailVerified;
  }
}
