import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { GoogleAuthProvider } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(public afAuth: AngularFireAuth) {
    this.authStatusListener();
  }

  authStatusListener() {
    this.afAuth.onAuthStateChanged((creds) => {
      if (creds) {
        this.currentUser = creds;
        console.log("User is logged in");
        console.log(creds);
      } else {
        this.currentUser = null;
        console.log("User is logged out");
      }
    });
  }

  login() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
