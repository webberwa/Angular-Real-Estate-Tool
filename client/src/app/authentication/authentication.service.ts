import { AlertService } from './../site/alert/alert.service';
import { GET_LOCAL_USER } from './../local-queries';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { CreateUserGQL, LoginUserGQL } from '../apollo-angular-services';
import gql from 'graphql-tag';
import { SET_LOCAL_USER } from '../local-queries';
import { map } from 'rxjs/operators';
import { Alert } from '../site/alert/alert.service';
import { Router } from '@angular/router';
import {
  ResetPasswordGQL,
  RequestResetPasswordGQL
} from '../apollo-angular-services';
const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated;
  me;
  constructor(
    private dialog: MatDialog,
    private createUserGQL: CreateUserGQL,
    private loginUserGQL: LoginUserGQL,
    private requestResetPasswordQGL: RequestResetPasswordGQL,
    private resetPasswordGQL: ResetPasswordGQL,
    private alert: AlertService,
    private apollo: Apollo,
    private router: Router
  ) {
    this.isAuthenticated = this.apollo
      .watchQuery({
        query: GET_LOCAL_USER
        // fetchPolicy: 'network-only'
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log('watch isAuthenticated');
          const { user } = data;
          if (!user) {
            return false;
          }
          return user.id != null ? true : false;
        })
      );
    this.me = this.apollo
      .watchQuery({
        query: GET_LOCAL_USER
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log('watch me');
          return data.user;
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
          // this.apollo
          //   .mutate({
          //     mutation: SET_LOCAL_USER,
          //     variables: {
          //       user
          //     }
          //   })
          //   .subscribe();

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

  requestResetUrl(form) {
    console.log(form);
    this.apollo
      .mutate({
        mutation: this.requestResetPasswordQGL.document,
        variables: {
          email: form.get('email').value
        }
      })
      .subscribe(
        res => {
          this.dialog.closeAll();
          this.alert.open({
            message: 'An email will be sent shortly',
            type: Alert.SUCCESS
          });

          console.log('done');
          /**
           * TODO
           */
        },
        err => {
          this.dialog.closeAll();
          // Return success message because we don't want users to know whether the email is valid (for security reasons)
          this.alert.open({
            message: 'An email will be sent shortly',
            type: Alert.SUCCESS
          });
          console.log(err.graphQLErrors);
        }
      );
  }

  resetPassword(form, token) {
    console.log(token);
    this.apollo
      .mutate({
        mutation: this.resetPasswordGQL.document,
        variables: {
          password: form.get('password').value,
          token
        }
      })
      .subscribe(
        res => {
          console.log('done');
          /**
           * TODO
           */
          this.dialog.closeAll();
          this.alert.open({
            message: 'You have successfully reset your password',
            type: Alert.SUCCESS
          });

          this.router.navigate(['/']);
        },
        err => {
          this.dialog.closeAll();
          this.alert.open({
            message:
              'We ran into some issues, please request another reset URL',
            type: Alert.ERROR
          });
          console.log(err.graphQLErrors);
        }
      );
  }

  storeTokenToLocalStorage(jwt) {
    localStorage.setItem('token', jwt);
  }
}
