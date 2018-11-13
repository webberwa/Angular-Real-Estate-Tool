import { ProvidersService } from '../providers/providers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {
  providerTypes;
  providerBeingEdited;
  placeholderName;
  providersForm = new FormGroup({
    name: new FormControl(this.placeholderName),
    type: new FormControl(''),
    phone_number: new FormControl('1'),
    email: new FormControl('Email'),
    addr1: new FormControl('Addr1'),
    addr2: new FormControl('Addr2')
  });

  constructor(private providers: ProvidersService) {
    this.providerTypes = providers.getProviderTypes();
    this.providerBeingEdited=this.providers.getProvider(this.providers.editID);
    this.placeholderName=this.providerBeingEdited.name;
  }

  edit(form){
    
    this.providers.updateProvider(form,this.providers.editID);
  }

  ngOnInit() {
  }

}



