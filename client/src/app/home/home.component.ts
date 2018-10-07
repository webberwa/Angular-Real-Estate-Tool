import { AuthenticationComponent } from './../authentication/authentication.component';
import { Component, OnInit } from '@angular/core';

@Component({
  providers: [AuthenticationComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthenticationComponent) {}

  ngOnInit() {}

  signup() {
    this.auth.openSignupDialog();
  }

  login() {
    this.auth.openLoginDialog();
  }
}
