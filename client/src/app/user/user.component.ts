import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
