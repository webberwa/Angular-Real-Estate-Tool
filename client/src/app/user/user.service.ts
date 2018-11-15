import { MeGQL, TestGQL } from './../apollo-angular-services';
import { AlertService } from '../site/alert/alert.service';
import { GET_LOCAL_USER, SET_LOCAL_USER } from '../local-queries';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {
  CreateUserGQL,
  LoginUserGQL,
  UpdateUserGQL
} from '../apollo-angular-services';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Alert } from '../site/alert/alert.service';
import { Router } from '@angular/router';
import { GenerateQrCodeGQL, Verify2faCodeGQL } from '../apollo-angular-services';
import {
  ResetPasswordGQL,
  RequestResetPasswordGQL
} from '../apollo-angular-services';
import { BehaviorSubject } from 'rxjs';
import { MyErrorStateMatcher } from '../error.state.catcher.class';

const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginFailed = false;
  // let us know when to load the nav
  userLoaded = new BehaviorSubject(false);
  matcher = new MyErrorStateMatcher();

  isAuthenticated = false;
  isAuthenticated$;
  me$;
  me;
  qrCode;
  constructor(
    private dialog: MatDialog,
    private meGQL: MeGQL,
    private testGQL: TestGQL,
    private createUserGQL: CreateUserGQL,
    private loginUserGQL: LoginUserGQL,
    private requestResetPasswordQGL: RequestResetPasswordGQL,
    private verify2faCodeGQL: Verify2faCodeGQL,
    private resetPasswordGQL: ResetPasswordGQL,
    private updateUserGQL: UpdateUserGQL,
    private generateQRCodeGQL: GenerateQrCodeGQL,
    private alert: AlertService,
    private apollo: Apollo,
    private router: Router,
    private socialAuthService: AuthService
  ) {
    this.isAuthenticated$ = this.apollo
      .watchQuery({
        query: GET_LOCAL_USER
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          const { user } = data;
          console.log('query GET_LOCAL_USER: isAuthenticated$', user);
          if (!user) {
            return false;
          }
          return user.id != null ? true : false;
        })
      );
    this.me$ = this.apollo
      .watchQuery({
        query: GET_LOCAL_USER
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log('query GET_LOCAL_USER: me$', data.user);
          return data.user;
        })
      );
    this.me$.subscribe(me => {
      this.me = me;
    });
  }

  updateAuthStatus() {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');

      if (!token) {
        this.userLoaded.next(true);
        return resolve(false);
      }

      this.apollo
        .watchQuery({
          query: this.meGQL.document
          // fetchPolicy: 'network-only'
        })
        .valueChanges.subscribe((res: any) => {
          const user = res.data.user;

          // console.log('meGQL', user);

          this.apollo
            .mutate({
              mutation: SET_LOCAL_USER,
              variables: {
                user
              }
            })
            .subscribe(r => {
              const localUser = r.data.setLocalUser;
              // console.log('mutate SET_LOCAL_USER');
              console.log(localUser.id);
              if (localUser.id) {
                this.isAuthenticated = true;
              }

              // Fire observable
              this.userLoaded.next(true);
              resolve(true);
            });
        });
    });
  }

  fetchMe() {
    this.apollo
      .watchQuery({
        query: this.meGQL.document,
        fetchPolicy: 'network-only'
      })
      .valueChanges.subscribe((res: any) => {
        const user = res.data.user;

        console.log('meGQL', user);

        this.apollo
          .mutate({
            mutation: SET_LOCAL_USER,
            variables: {
              user
            }
          })
          .subscribe(_ => {
            console.log('mutate SET_LOCAL_USER');
          });
      });
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    this.apollo.getClient().resetStore();
    this.alert.open({
      message: 'Logout successful',
      type: Alert.SUCCESS
    });
    this.router.navigate(['/']);
  }

  createUser(email, password, firstname, lastname) {
    this.apollo
      .mutate({
        mutation: this.createUserGQL.document,
        variables: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password
        }
      })
      .subscribe(
        res => {
          // This is our success callback
          console.log(res);
          const token = res.data.createUser.token;
          this.storeTokenToLocalStorage(token);
          location.reload();
        },
        err => {
          // Need to access GraphQL error object to see errors
          console.log(err.graphQLErrors);
        }
      );
  }

  loginUser(email, password, code) {
    this.apollo
      .mutate({
        mutation: this.loginUserGQL.document,
        variables: {
          email: email,
          password: password,
          code: code
        }
      })
      .subscribe(
        res => {
          console.log('loginUser() subscribe');
          console.log(res);

          if (!res.data.loginUser) {
            return this.alert.open({
              message: 'Something went wrong, please try again.',
              type: Alert.ERROR
            });
          }

          const token = res.data.loginUser.token;
          const user = res.data.loginUser.user;

          // Set local user
          this.apollo
            .mutate({
              mutation: SET_LOCAL_USER,
              variables: {
                user
              }
            })
            .subscribe(_ => {
              console.log('mutate SET_LOCAL_USER');
              this.alert.open({
                message: 'Login successful',
                type: Alert.SUCCESS
              });
              this.isAuthenticated = true;

              this.storeTokenToLocalStorage(token);
              this.router.navigate(['/profile']);
            });
        },
        err => {
          this.alert.open({
            message: 'Something went wrong, please try again.',
            type: Alert.ERROR
          });

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

  updateSettings() {
    console.log('update settings');
  }

  updateUser(id, data) {
    console.log(id, data);
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: this.updateUserGQL.document,
          variables: {
            data,
            where: {
              id
            }
          }
        })
        .subscribe(
          res => {
            this.alert.open({
              message: 'Your settings have been updated',
              type: Alert.SUCCESS
            });
            console.log('done');
            return resolve();
          },
          err => {
            console.log(err.graphQLErrors);
            return err.graphQLErrors;
          }
        );
    });
  }

  async generateQRCode() {
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: this.generateQRCodeGQL.document
        })
        .subscribe(
          res => {
            this.qrCode = res.data.generateQRCode;
            console.log('done generate');
            return resolve(res.data);
          },
          err => {
            return reject(err.graphQLErrors);
          }
        );
    });
  }

  verify2fa(form) {
    this.apollo
      .mutate({
        mutation: this.verify2faCodeGQL.document,
        variables: {
          code: form.get('code').value
        }
      })
      .subscribe(res => {
        const verified = res.data.verify2faCode;
        if (verified) {
          this.alert.open({
            message: 'You have enabled 2FA',
            type: Alert.SUCCESS
          });

          this.fetchMe();
        } else {
          this.alert.open({
            message: 'Incorrect 2FA code',
            type: Alert.ERROR
          });
        }
      });
  }

  resetQRCode() {
    this.qrCode = null;
  }

  socialAuthentication(socialPlatform: string, logIn: boolean) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    // TODO: add domain auth for google along with website name.
    /*
    else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }*/
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      console.log(socialPlatform + ' sign in data : ', userData);
      // sign-in with userData else sign up
      if (logIn) {
        this.loginUser(userData.email, userData.id, '');
      } else {
        const nameArray = userData.name.split(' ');
        this.createUser(userData.email, userData.id, nameArray[0], nameArray[1]);
      }
    });
  }
}
