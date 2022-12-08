import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { FirebaseAuth, FirebaseApp } from '@angular/fire';
import { User } from '../../shared/models/user';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable(/*{
  providedIn: 'root'
}*/
)
export class UsersService {

  //public user: Promise<User>;
  constructor(public af: AngularFirestore, private fAuth: AngularFireAuth, public router: Router) {
   //constructor(public fAuth: AngularFireAuth, public router: Router) {
    this.fAuth.authState.subscribe(userResponse => {
      if (userResponse) {
        localStorage.setItem('user', JSON.stringify(userResponse));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

/*SingIn(user: User) {
    
    //firebase.auth.EmailAuthProvider.credential(user.Email, user.Pass);
    
    //const credential = this.fAuth.EmailAuthProvider.credential( user.Email, user.Pass );
  /*  this.fAuth.signInWithEmailAndPassword(user.Email, user.Pass).then(function (doc) {
      const id = doc.user.email;
      //const data = doc.user;
      console.log(id);
    })
}*/


   async login(email: string, password: string) {
    return await this.fAuth.auth.signInWithEmailAndPassword(email, password);
  }
 
  async register(email: string, password: string) {
    return await this.fAuth.auth.createUserWithEmailAndPassword(email, password)
  }
 
  async sendEmailVerification() {
    return await this.fAuth.auth.currentUser.sendEmailVerification();
  }
 
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.fAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }
 
  async logout() {
    return await this.fAuth.auth.signOut();
  }
 
 
  isUserLoggedIn() {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  async  loginWithGoogle() {
    return await this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
}
