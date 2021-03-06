import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  signupForm: FormGroup = this.formBuilder.group({
    firstname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ])
    ],
    lastname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ])
    ],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)])
    ]
  });

  constructor(private auth: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {}

  socialSignUp(socialPlatform: string) {
    this.auth.socialAuthentication(socialPlatform, false);
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    this.auth.createUser(email, password, firstname, lastname);
  }
}
