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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      has_two_factor: new FormControl(false),
      code: new FormControl('')
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  socialSignIn(socialPlatform: string) {
    this.auth.socialAuthentication(socialPlatform, true);
  }

  login() {
    // stop here if form is invalid
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    const code = this.loginForm.get('code').value;
    this.auth.loginUser(email, password, code);
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
