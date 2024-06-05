import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  constructor() {}

  crearUsuario(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
