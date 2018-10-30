import { UserService } from '../user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private auth: UserService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
   });
  }

  socialSignUp(socialPlatform: string) {
    this.auth.socialAuthentication(socialPlatform, false);
  }

  signup() {

    if (this.signupForm.invalid) {
      return;
    }
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.auth.createUser(email, password);
  }
}
