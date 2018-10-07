import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      width: '400px'
    });
  }
  openSignupDialog() {
    this.dialog.open(SignupDialogComponent, {
      width: '400px'
    });
  }
}
