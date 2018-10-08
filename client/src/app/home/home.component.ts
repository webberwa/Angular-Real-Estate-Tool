import { AuthenticationComponent } from './../authentication/authentication.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { MeGQL } from '../apollo-angular-services';

@Component({
  providers: [AuthenticationComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  me;
  constructor(
    private meGQL: MeGQL,
    private authComp: AuthenticationComponent,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.meGQL.watch().valueChanges.subscribe(res => {
      this.me = res.data.me;
    });
    // this.me = this.authService.me();
  }

  signup() {
    this.authComp.openSignupDialog();
  }

  login() {
    this.authComp.openLoginDialog();
  }
}
