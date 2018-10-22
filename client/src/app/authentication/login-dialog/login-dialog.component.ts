import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { animate, transition, trigger, state, style, keyframes } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  animations: [
    trigger('invalidLoginAlert', [
      state('added', style({
        transform: 'translateX(0px)'
      })),
      transition('void => *', [
        animate(300, keyframes([
          style({
            transform: 'translateX(20px)'
          }),
          style({
            transform: 'translateX(0px)'
          }),
          style({
            transform: 'translateX(-20px)'
          }),
          style({
            transform: 'translateX(0px)'
          }),
          style({
            transform: 'translateX(20px)'
          }),
          style({
            transform: 'translateX(0px)'
          }),
          style({
            transform: 'translateX(-20px)'
          }),
          style({
            transform: 'translateX(0px)'
          })
        ])
      )])
  ])]
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private auth: AuthenticationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFailed = false;
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
   });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.loginFailed = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.loginUser(this.loginForm);
    this.loginFailed = this.auth.loginFailed;
  }
}
