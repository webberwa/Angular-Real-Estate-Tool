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
    name: new FormControl('Name'),
    type: new FormControl(''),
    phone_number: new FormControl('1'),
    email: new FormControl('Email'),
    addr1: new FormControl('Addr1'),
    addr2: new FormControl('Addr2')
  });

  constructor(private providers: ProvidersService) {
    this.providerTypes = providers.getProviderTypes();
  }

  ngOnInit() {}
}
