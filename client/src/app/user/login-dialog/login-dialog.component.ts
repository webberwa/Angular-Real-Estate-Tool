import { Apollo } from 'apollo-angular';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { ResetPasswordDialogComponent } from '../reset-password-dialog/reset-password-dialog.component';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(
    private auth: UserService,
    private dialog: MatDialog,
    private apollo: Apollo,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginFailed = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      has_two_factor: new FormControl(false),
      code: new FormControl('')
    });
  }

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
