import { AuthenticationComponent } from './../authentication/authentication.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MeGQL } from '../apollo-angular-services';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

const GET_LOCAL_USER = gql`
  {
    user @client {
      id
      email
    }
  }
`;

const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;

@Component({
  providers: [AuthenticationComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  me;
  localUser;
  constructor(
    private apollo: Apollo,
    private meGQL: MeGQL,
    private authComp: AuthenticationComponent,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.localUser = this.apollo
      .watchQuery({
        query: GET_LOCAL_USER
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log(data);
          return data.user;
        })
      );
  }

  signup() {
    this.authComp.openSignupDialog();
  }

  login() {
    this.authComp.openLoginDialog();
  }
}
