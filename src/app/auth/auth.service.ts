import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducers';
import * as authActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {

    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user=> {
                this.store.dispatch(new authActions.Signup());
                firebase.auth().currentUser.getIdToken()
                .then((token: string)=> {
                    this.store.dispatch(new authActions.Set_token(token));
                })
            })
            .catch(
                error => console.log(error)
            )
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(response => {
                this.store.dispatch(new authActions.Signin())
                this.router.navigate(['/']);
                firebase.auth().currentUser.getIdToken()
                    .then((token: string)=> {
                        this.store.dispatch(new authActions.Set_token(token));
                    })
            })
            .catch(error => console.log("error",error))
    }

    logOut() {
        firebase.auth().signOut();
        this.store.dispatch(new authActions.Logout());
    }
}