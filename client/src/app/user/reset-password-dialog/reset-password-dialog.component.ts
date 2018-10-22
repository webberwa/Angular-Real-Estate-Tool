import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(private auth: UserService) {}

  ngOnInit() {}
}
