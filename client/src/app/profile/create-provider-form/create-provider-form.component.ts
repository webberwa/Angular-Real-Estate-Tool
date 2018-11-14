import { ProvidersService } from './../../providers/providers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-provider-form',
  templateUrl: './create-provider-form.component.html',
  styleUrls: ['./create-provider-form.component.css']
})
export class CreateProviderFormComponent implements OnInit {
  providerTypes;

  providersForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
    phone_number: new FormControl(''),
    email: new FormControl(''),
    addr1: new FormControl(''),
    addr2: new FormControl('')
  });

  constructor(private providers: ProvidersService) {
    this.providerTypes = providers.getProviderTypes();
  }

  ngOnInit() {}
}
