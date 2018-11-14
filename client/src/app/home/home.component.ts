import { Router, ActivatedRoute } from '@angular/router';
import { GET_LOCAL_USER } from './../local-queries';
import { UserComponent } from '../user/user.component';
import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../user/user.service';
import { MeGQL } from '../apollo-angular-services';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { DOCUMENT } from '@angular/common';

const LOGOUT = gql`
  mutation logout {
    logout @client
  }
`;

@Component({
  providers: [UserComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url;
  panel_status: string;

  constructor(
    private apollo: Apollo,
    private meGQL: MeGQL,
    private userComp: UserComponent,
    private userService: UserService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.url = router.url;
  }

  ngOnInit() {}

  signup() {
    this.userComp.openSignupDialog();
  }

  login() {
    this.userComp.openLoginDialog();
  }

  expand_panel(event, location: string) {
    this.panel_status = location+"-hover";
  }
}
