import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProvidersService } from '../profile/providers/providers.service';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {
  providerTypes;
  providerBeingEdited;
  placeholderName;
  placeholderType;
  placeholderPhone;
  placeholderEmail;
  placeholderState;
  placeholderCity;
  placeholderStreet;
  placeholderZip;
  providersForm = new FormGroup({
    name: new FormControl(this.placeholderName),
    type: new FormControl(this.placeholderType),
    phone_number: new FormControl(this.placeholderPhone),
    email: new FormControl(this.placeholderEmail),
    state: new FormControl(this.placeholderState),
    city: new FormControl(this.placeholderCity),
    street: new FormControl(this.placeholderStreet),
    zip: new FormControl(this.placeholderZip)
  });

  constructor(private providers: ProvidersService) {
    this.providerTypes = providers.getProviderTypes();
    this.providerBeingEdited = this.providers.getProvider(this.providers.editID);
    this.placeholderName = this.providerBeingEdited.name;
    this.placeholderType = this.providerBeingEdited.type;
    this.placeholderPhone = this.providerBeingEdited.phone_number;
    this.placeholderEmail = this.providerBeingEdited.email;
    this.placeholderState = this.providerBeingEdited.state;
    this.placeholderCity = this.providerBeingEdited.city;
    this.placeholderStreet = this.providerBeingEdited.street;
    this.placeholderZip = this.providerBeingEdited.zip;
  }

  edit(form) {
    this.providers.updateProvider(form, this.providers.editID);
  }

  ngOnInit() {}
}
