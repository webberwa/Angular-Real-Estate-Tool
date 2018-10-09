import { MatDialog } from '@angular/material';
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
import gql from 'graphql-tag';
const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: BehaviorSubject<any> = new BehaviorSubject(null);
  public readonly user$: Observable<any> = this._user.asObservable();

  constructor(
    private dialog: MatDialog,
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

  logout() {
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
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
        }
      })
      .subscribe(
        res => {
          this.dialog.closeAll();

          console.log(res);
          const token = res.data.loginUser.token;
          const user = res.data.loginUser.user;

          console.log(user);
          this.apollo.getClient().writeData({
            data: { user }
          });
          this.storeTokenToLocalStorage(token);
        },
        err => {
          console.log(err.graphQLErrors);
        }
      );
  }

  storeTokenToLocalStorage(jwt) {
    localStorage.setItem('token', jwt);
  }
}