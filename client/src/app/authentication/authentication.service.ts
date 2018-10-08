import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {
  CreateUserGQL,
  LoginUserGQL,
  MeGQL,
  UserGQL
} from '../apollo-angular-services';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: BehaviorSubject<any> = new BehaviorSubject(null);
  public readonly user$: Observable<any> = this._user.asObservable();

  constructor(
    private router: Router,
    private createUserGQL: CreateUserGQL,
    private loginUserGQL: LoginUserGQL,
    private userGQL: UserGQL,
    private meGQL: MeGQL,
    private apollo: Apollo
  ) {
    // this.meGQL.watch().valueChanges.subscribe(res => {
    //   console.log(res);
    //   this._user.next(res.data.me);
    // });
    // // Our subscription
    // this.user$.subscribe();
  }

  me() {
    // return this.user;
    return this.meGQL.watch().valueChanges.pipe(
      map(({ data }) => {
        console.log(data);
        return data.me;
      })
    );
  }

  createUser(form) {
    this.apollo
      .mutate({
        mutation: this.createUserGQL.document,
        variables: {
          email: form.get('email').value,
          password: form.get('password').value
        }
      })
      .subscribe(
        res => {
          // This is our success callback
          const token = res.data.createUser.token;
          this.storeTokenToLocalStorage(token);
        },
        err => {
          // Need to access GraphQL error object to see errors
          console.log(err.graphQLErrors);
        }
      );
  }

  loginUser(form) {
    this.apollo
      .mutate({
        mutation: this.loginUserGQL.document,
        variables: {
          email: form.get('email').value,
          password: form.get('password').value
        },
        refetchQueries: [
          {
            query: this.meGQL.document
          }
        ]
      })
      .subscribe(
        res => {
          console.log(res);
          const token = res.data.loginUser.token;
          this.storeTokenToLocalStorage(token);
        },
        err => {
          console.log(err.graphQLErrors);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  storeTokenToLocalStorage(jwt) {
    localStorage.setItem('token', jwt);
  }
}
