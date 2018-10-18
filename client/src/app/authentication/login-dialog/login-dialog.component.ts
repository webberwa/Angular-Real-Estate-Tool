import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
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
    password: new FormControl('')
  });

  constructor(private auth: AuthenticationService, private dialog: MatDialog) {}

  ngOnInit() {}

  login() {
    this.auth.loginUser(this.loginForm);
  }
  openResetPasswordDialog(event) {
    event.preventDefault();
    this.dialog.closeAll();
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px'
    });
  }
}
