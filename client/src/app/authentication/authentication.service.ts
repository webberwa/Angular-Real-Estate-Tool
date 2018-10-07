import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { CreateUserGQL, LoginUserGQL } from '../apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private createUserGQL: CreateUserGQL,
    private loginUserGQL: LoginUserGQL,
    private apollo: Apollo
  ) {}

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
          console.log(res);
          const token = res.data.loginUser.token;
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
