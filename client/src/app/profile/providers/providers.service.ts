import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { UserService } from 'src/app/user/user.service';
import { map } from 'rxjs/operators';
import { find, findIndex } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Alert, AlertService } from '../../site/alert/alert.service';

import {
  AddProviderGQL,
  DeleteProviderGQL,
  ProviderGQL,
  ProvidersGQL,
  UpdateProviderGQL
} from 'src/app/apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  public myProviders;
  private me;
  editID;
  deletetrue;
  searchStream = new BehaviorSubject('');
  searchInput = '';
  searchType = '';
  searchSkip = 0;
  allProviders;

  pageIndex = 1;
  has_next = false;

  initial = true;

  myProviderQuery;
  // just try
  providerBeingEdited;
  serviceProviderTypes = [
    {
      label: 'All',
      value: ''
    },
    {
      label: 'Property Manager',
      value: 'property_manager'
    },
    {
      label: 'Real Estate Agent',
      value: 'real_estate_agent'
    },
    {
      label: 'Contractor',
      value: 'contractor'
    }
  ];

  states = [
    { name: 'alabama', abbr: 'AL' },
    { name: 'alaska', abbr: 'AK' },
    { name: 'arizona', abbr: 'AZ' },
    { name: 'arkansas', abbr: 'AR' },
    { name: 'california', abbr: 'CA' },
    { name: 'colorado', abbr: 'CO' },
    { name: 'connecticut', abbr: 'CT' },
    { name: 'delaware', abbr: 'DE' },
    { name: 'florida', abbr: 'FL' },
    { name: 'georgia', abbr: 'GA' },
    { name: 'hawaii', abbr: 'HI' },
    { name: 'idaho', abbr: 'ID' },
    { name: 'illinois', abbr: 'IL' },
    { name: 'indiana', abbr: 'IN' },
    { name: 'iowa', abbr: 'IA' },
    { name: 'kansas', abbr: 'KS' },
    { name: 'kentucky', abbr: 'KY' },
    { name: 'louisiana', abbr: 'LA' },
    { name: 'maine', abbr: 'ME' },
    { name: 'maryland', abbr: 'MD' },
    { name: 'massachusetts', abbr: 'MA' },
    { name: 'michigan', abbr: 'MI' },
    { name: 'minnesota', abbr: 'MN' },
    { name: 'mississippi', abbr: 'MS' },
    { name: 'missouri', abbr: 'MO' },
    { name: 'montana', abbr: 'MT' },
    { name: 'nebraska', abbr: 'NE' },
    { name: 'nevada', abbr: 'NV' },
    { name: 'new hampshire', abbr: 'NH' },
    { name: 'new jersey', abbr: 'NJ' },
    { name: 'new mexico', abbr: 'NM' },
    { name: 'new york', abbr: 'NY' },
    { name: 'north carolina', abbr: 'NC' },
    { name: 'north dakota', abbr: 'ND' },
    { name: 'ohio', abbr: 'OH' },
    { name: 'oklahoma', abbr: 'OK' },
    { name: 'oregon', abbr: 'OR' },
    { name: 'pennsylvania', abbr: 'PA' },
    { name: 'rhode island', abbr: 'RI' },
    { name: 'south carolina', abbr: 'SC' },
    { name: 'south dakota', abbr: 'SD' },
    { name: 'tennessee', abbr: 'TN' },
    { name: 'texas', abbr: 'TX' },
    { name: 'utah', abbr: 'UT' },
    { name: 'vermont', abbr: 'VT' },
    { name: 'virginia', abbr: 'VA' },
    { name: 'washington', abbr: 'WA' },
    { name: 'west virginia', abbr: 'WV' },
    { name: 'wisconsin', abbr: 'WI' },
    { name: 'wyoming', abbr: 'WY ' }
  ];

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private addProvidersGQL: AddProviderGQL,
    private providersGQL: ProvidersGQL,
    private providerGQL: ProviderGQL,
    private userService: UserService,
    private deleteProviderGQL: DeleteProviderGQL,
    private updateProviderGQL: UpdateProviderGQL,
    private alert: AlertService
  ) {
    this.me = userService.me;
    this.myProviderQuery = {
      query: this.providersGQL.document,
      variables: {
        where: {
          owner: {
            id: this.me && this.me.id ? this.me.id : null
          }
        }
      }
    };

    this.myProviders = this.apollo
      .watchQuery(this.myProviderQuery)
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log(data);
          return data.providers;
        })
      );
  }

  searchProviders() {
    this.initial = false;

    const inputs = this.searchInput.split(/\s+/);
    const input_states = this.states.filter(
      state => inputs.includes(state.abbr) || inputs.includes(state.name)
    );
    input_states.forEach(state => {
      inputs.push(state.name);
      inputs.push(state.abbr);
    });

    const inputTextSearchCriteria = inputs.map(input => {
      return {
        OR: [
          { name_contains: input },
          { phone_number_contains: input },
          { email_contains: input },
          { street_contains: input },
          { city_contains: input },
          { state_contains: input },
          { zip_contains: input }
        ]
      };
    });

    return this.apollo
      .watchQuery({
        query: this.providersGQL.document,
        variables: {
          where: {
            AND: [
              { OR: inputTextSearchCriteria },
              { type_contains: this.searchType }
            ]
          },
          first: 11,
          skip: this.searchSkip
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          return {
            providers: data.providers.data.slice(0, 10),
            hasNext: data.providers.data.length > 10
          };
        })
      );
  }

  addProvider(form) {
    console.log('add provider');
    console.log(form.get('state').value);
    this.apollo
      .mutate({
        mutation: this.addProvidersGQL.document,
        refetchQueries: [this.myProviderQuery],
        variables: {
          data: {
            name: form.get('name').value,
            type: form.get('type').value,
            phone_number: form.get('phone_number').value,
            email: form.get('email').value,
            street: form.get('street').value,
            city: form.get('city').value,
            state: form.get('state').value,
            zip: form.get('zip').value,
            long: form.get('long').value || 0,
            lat: form.get('lat').value || 0
          }
        }
      })
      .subscribe(res => {
        this.alert.open({
          message: 'Provider added successfully!',
          type: Alert.SUCCESS
        });
        this.dialog.closeAll();
      });
  }

  updateProvider(form, id) {
    console.log(form);
    console.log(id);
    this.providerBeingEdited = this.getProvider(id);
    let n = form.get('name').value;
    if (form.get('name').value == null) {
      n = this.providerBeingEdited.name;
    }

    let t = form.get('type').value;
    if (t == null) {
      t = this.providerBeingEdited.type;
    }

    let p = form.get('phone_number').value;
    if (p == null) {
      p = this.providerBeingEdited.phone_number;
    }

    let e = form.get('email').value;
    if (e == null) {
      e = this.providerBeingEdited.email;
    }

    let s = form.get('street').value;
    if (s == null) {
      s = this.providerBeingEdited.street;
    }

    let c = form.get('city').value;
    if (c == null) {
      c = this.providerBeingEdited.city;
    }

    let st = form.get('state').value;
    if (st == null) {
      st = this.providerBeingEdited.state;
    }

    let z = form.get('zip').value;
    if (z == null) {
      z = this.providerBeingEdited.zip;
    }
    this.apollo
      .mutate({
        mutation: this.updateProviderGQL.document,
        refetchQueries: [this.myProviderQuery],
        variables: {
          data: {
            name: n,
            type: t,
            phone_number: p,
            email: e,
            street: s,
            city: c,
            state: st,
            zip: z
          },
          where: {
            id
          }
        }
      })
      .subscribe(res => {
        this.alert.open({
          message: 'Provider updated successfully!',
          type: Alert.SUCCESS
        });
        this.dialog.closeAll();
        console.log(res);
      });
  }
  getProvider(id) {
    return this.apollo
      .watchQuery({
        query: this.providerGQL.document,
        variables: {
          where: {
            id
          }
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log(data.provider);
          return data.provider;
        })
      );
  }

  deleteProvider(id) {
    this.apollo
      .mutate({
        mutation: this.deleteProviderGQL.document,
        refetchQueries: [this.myProviderQuery],
        variables: {
          where: {
            id
          }
        }
      })
      .subscribe(() => {
        this.alert.open({
          message: 'Provider deleted successfully!',
          type: Alert.SUCCESS
        });
      });
  }

  getProviderTypes() {
    return this.serviceProviderTypes;
  }

  getProviderTypeLabel(type) {
    if (type) {
      const index = findIndex(this.serviceProviderTypes, { value: type });
      const label = this.serviceProviderTypes[index].label;
      return label;
    }
  }

  getStateOptionValue(state) {
    return find(this.states, { abbr: state });
  }

  formatPhoneNumber(phoneNumber: string) {
    return (
      '(' +
      phoneNumber.substr(0, 3) +
      ') ' +
      phoneNumber.substr(3, 3) +
      '-' +
      phoneNumber.substr(6)
    );
  }
}
