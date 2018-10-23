import { GET_LOCAL_USER } from './../local-queries';
import { UserComponent } from '../user/user.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { MeGQL } from '../apollo-angular-services';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;

@Component({
  providers: [UserComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private meGQL: MeGQL,
    private userComp: UserComponent,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log('home component');
  }

  signup() {
    this.userComp.openSignupDialog();
  }

  login() {
    this.userComp.openLoginDialog();
  }
}
