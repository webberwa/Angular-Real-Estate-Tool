import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProvidersService } from '../providers/providers.service';

@Component({
  selector: 'app-create-provider-form',
  templateUrl: './create-provider-form.component.html',
  styleUrls: ['./create-provider-form.component.css']
})
export class CreateProviderFormComponent implements OnInit {
  providerTypes;

  providersForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    addr1: new FormControl('', Validators.required),
    addr2: new FormControl('', Validators.required)
  });

  constructor(private providers: ProvidersService) {
    this.providerTypes = providers.getProviderTypes();
  }

  ngOnInit() {}
}
