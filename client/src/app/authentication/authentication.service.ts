import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { CreateUserGQL } from '../apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private createUserGQL: CreateUserGQL, private apollo: Apollo) {}

  createUser(form) {
    console.log('create user');
    this.apollo
      .mutate({
        mutation: this.createUserGQL.document,
        variables: {
          email: form.get('email').value,
          password: form.get('password').value
        }
      })
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }
}
