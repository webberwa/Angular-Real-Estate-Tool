import { ProvidersService } from './../../providers/providers.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { MyErrorStateMatcher } from '../../error.state.catcher.class';

@Component({
  selector: 'app-create-provider-form',
  templateUrl: './create-provider-form.component.html',
  styleUrls: ['./create-provider-form.component.css']
})
export class CreateProviderFormComponent implements OnInit {
  providerTypes;
  matcher = new MyErrorStateMatcher();

  providersForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
    type: ['', Validators.required],
    phone_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    address: this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])],
      state: ['', Validators.required],
      zip: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])]
    }),
  });

  constructor(private providers: ProvidersService, private formBuilder: FormBuilder) {
    this.providerTypes = providers.getProviderTypes();
  }

  ngOnInit() {}
}
