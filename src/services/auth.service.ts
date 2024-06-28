import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth = inject(Auth);
  firestore: Firestore = inject(Firestore);
  user$?: Observable<User>;
  currentUser: any;

  constructor(private firestoreS: FirestoreService) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.firestoreS
          .obtenerFirestoreUsuarioAdmin(user.email!)
          .then((user) => {
            console.log(user);
            this.currentUser = user;
          });
      } else {
        this.currentUser = null;
      }
    });
  }

  logueado() {
    return this.auth.currentUser;
  }

  // obtenerUser() {
  //   onAuthStateChanged(this.auth, (user) => {
  //     if (user) {
  //       this.firestoreS.obtenerFirestoreUsuario(user.email!).then((user) => {
  //         return user;
  //       });
  //     } else {
  //       return null;
  //     }
  //   });
  // }

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

  async crearUsuarioAdmin(
    email: string,
    password: string,
    foto: string,
    nombre: string
  ) {
    return await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    ).then(async (userCredential) => {
      updateProfile(userCredential.user, {
        photoURL: foto,
        displayName: nombre,
      });
    });
  }

  getUser() {
    return this.auth.currentUser;
  }

  esAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      getDocs(collection(this.firestore, 'users'))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()['email'] == this.auth.currentUser?.email) {
              if (doc.data()['admin'] == 'true') {
                resolve(true); // Return true if user is admin
              }
            }
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          reject(false); // Return false on error
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
    } else if (user[0].tipo == 'paciente' && user.length > 0) {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return this.verificarEmailValidado(userCredential);
    } else {
      await signInWithEmailAndPassword(this.auth, email, password);
      let tipo;
      await this.firestoreS
        .obtenerFirestoreUsuarioAdmin(email)
        .then((user: any) => {
          user.forEach((doc: any) => {
            tipo = doc.tipo;
          });
        });
      return {
        tipo: tipo,
      };
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
