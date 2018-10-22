import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    has_two_factor: new FormControl(false),
    code: new FormControl('')
  });

  constructor(
    private auth: UserService,
    private dialog: MatDialog,
    private apollo: Apollo
  ) {}

  ngOnInit() {}

  login() {
    this.auth.loginUser(this.loginForm);
  }

  reset() {
    this.apollo.getClient().resetStore();
  }

  openResetPasswordDialog(event) {
    event.preventDefault();
    this.dialog.closeAll();
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px'
    });
  }
}
