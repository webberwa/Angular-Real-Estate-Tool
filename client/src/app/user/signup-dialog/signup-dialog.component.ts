import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.css']
})
export class SignupDialogComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private auth: UserService) {}

  ngOnInit() {}

  signup() {
    this.auth.createUser(this.signupForm);
  }
}
