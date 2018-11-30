import { MAT_DIALOG_DATA } from '@angular/material';
import {Component, OnInit, Input, Inject, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../error.state.catcher.class';
import { ProvidersService } from '../providers/providers.service';
import { find } from 'lodash';

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
  submitArgs;

  provider = {
    id: '',
    name: '',
    type: '',
    phone_number: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    long: '',
    lat: ''
  };

  constructor(
    private providers: ProvidersService,
    private formBuilder: FormBuilder,
    private changeDetectorRefs: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.providerTypes = providers.getProviderTypes();
    console.log(this.providerTypes);
    console.log(data);

    // If editing, we pass in data
    if (data) {
      this.provider = data.provider;
      this.action = 'Update';
    }

    // Create form
    this.providersForm = this.formBuilder.group({
      name: [
        this.provider.name,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      type: [this.provider.type, Validators.required],
      phone_number: [
        this.provider.phone_number,
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ],
      email: [
        this.provider.email,
        Validators.compose([Validators.required, Validators.email])
      ],
      street: [this.provider.street, Validators.required],
      city: [
        this.provider.city,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z ]*$')
        ])
      ],
      state: [
        this.provider.state,
        Validators.required
      ],
      zip: [
        this.provider.zip,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      long: [
        this.provider.long
      ],
      lat: [
        this.provider.lat
      ]
    });

    // Set args
    if (data) {
      this.submitCb = providers.updateProvider;
      this.submitArgs = [this.providersForm, this.provider.id];
    } else {
      // Set submit args
      this.submitCb = providers.addProvider;
      this.submitArgs = [this.providersForm];
    }
  }

  ngOnInit() {}

  onSubmit(cb, args) {
    const state = this.providers.getStateOptionValue(this.providersForm.get("state").value);
    args[0].patchValue({ state });

    cb.apply(this.providers, args);
  }

  onChangingAddress(result) {
    this.providersForm.patchValue({ street: result.address });
    this.providersForm.patchValue({ city: result.city });
    this.providersForm.patchValue({ state: result.state });
    this.providersForm.patchValue({ zip: result.zip_code });
    this.providersForm.patchValue({ long: result.long });
    this.providersForm.patchValue({ lat: result.lat });

    this.providersForm.updateValueAndValidity();
    this.changeDetectorRefs.detectChanges();
  }
}
