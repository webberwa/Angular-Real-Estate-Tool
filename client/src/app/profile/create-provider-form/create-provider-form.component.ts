import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../error.state.catcher.class';
import { ProvidersService } from '../providers/providers.service';

@Component({
  selector: 'app-create-provider-form',
  templateUrl: './create-provider-form.component.html',
  styleUrls: ['./create-provider-form.component.css']
})
export class CreateProviderFormComponent implements OnInit {
  providerTypes;
  matcher = new MyErrorStateMatcher();

  providersForm: FormGroup;
  action = 'Create';

  submitCb;

  constructor(
    private providers: ProvidersService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.providerTypes = providers.getProviderTypes();
    console.log(this.providerTypes);
    console.log(data);

    let provider;
    // If editing, we pass in data
    if (data) {
      provider = data.provider;
      this.action = 'Update';
    } else {
      // Set submit args
      this.submitCb = providers.addProvider;

      provider = {
        name: '',
        type: '',
        phone_number: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: ''
      };
    }

    console.log(provider);

    // Create form
    this.providersForm = this.formBuilder.group({
      name: [
        provider.name,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      type: [provider.type, Validators.required],
      phone_number: [
        provider.phone_number,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      email: [
        provider.email,
        Validators.compose([Validators.required, Validators.email])
      ],
      street: [provider.street, Validators.required],
      city: [
        provider.city,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      state: [provider.state, Validators.required],
      zip: [
        provider.zip,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ]
    });
  }

  ngOnInit() {}

  onSubmit(cb, args) {
    // (click)="providers.addProvider(providersForm)"
    cb.call(args);
  }
}
