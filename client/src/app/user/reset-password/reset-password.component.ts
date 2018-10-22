import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl('')
  });
  token;
  constructor(private auth: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }
}
