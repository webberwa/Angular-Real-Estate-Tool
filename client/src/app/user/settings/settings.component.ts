import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userSettingsForm = new FormGroup({
    has_two_factor: new FormControl(false),
    code: new FormControl('')
  });
  isActivating = false;
  constructor(private user: UserService) {}

  async activate2fa() {
    this.isActivating = true;
    this.userSettingsForm.patchValue({ has_two_factor: true });
    await this.user.generateQRCode();
    this.user.fetchMe();
    this.userSettingsForm.patchValue({ code: '' });
  }

  async deactivate2fa() {
    const user = this.user.me;
    await this.user.updateUser(this.user.me.id, { has_two_factor: false });
    this.user.fetchMe();
  }

  ngOnInit() {}
}
