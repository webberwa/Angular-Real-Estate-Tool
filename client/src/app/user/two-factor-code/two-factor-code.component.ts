import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-two-factor-code',
  templateUrl: './two-factor-code.component.html',
  styleUrls: ['./two-factor-code.component.css']
})
export class TwoFactorCodeComponent implements OnInit {
  twoFactorForm = new FormGroup({
    code: new FormControl('')
  });

  constructor() {}

  ngOnInit() {}
}
