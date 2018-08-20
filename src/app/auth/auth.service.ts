import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    token: string;
    constructor(private router: Router) {
    }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (tok: string) => this.token = tok
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (tok: string) => this.token = tok
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}