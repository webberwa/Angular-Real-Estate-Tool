import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import {
  AddProviderGQL,
  ProvidersGQL,
  ProviderGQL,
  UpdateProviderGQL
} from '../apollo-angular-services';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { findIndex } from 'lodash';
import { DeleteProviderGQL } from '../apollo-angular-services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  public myProviders;
  private me;
  editID;
  searchStream = new BehaviorSubject('');
  searchInput = '';
  searchType = '';
  searchSkip = 0;
  allProviders;

  myProviderQuery;

  serviceProviderTypes = [
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
    { name: "alabama", abbr: "AL" },
    { name: "alaska", abbr: "AK" },
    { name: "arizona", abbr: "AZ" },
    { name: "arkansas", abbr:"AR" },
    { name: "california", abbr:"CA" },
    { name: "colorado", abbr:"CO" },
    { name: "connecticut", abbr:"CT" },
    { name: "delaware", abbr:"DE" },
    { name: "florida", abbr:"FL" },
    { name: "georgia", abbr:"GA" },
    { name: "hawaii", abbr:"HI" },
    { name: "idaho", abbr:"ID" },
    { name: "illinois", abbr:"IL" },
    { name: "indiana", abbr:"IN" },
    { name: "iowa", abbr:"IA" },
    { name: "kansas", abbr:"KS" },
    { name: "kentucky", abbr:"KY" },
    { name: "louisiana", abbr:"LA" },
    { name: "maine", abbr:"ME" },
    { name: "maryland", abbr:"MD" },
    { name: "massachusetts", abbr:"MA" },
    { name: "michigan", abbr:"MI" },
    { name: "minnesota", abbr:"MN" },
    { name: "mississippi", abbr:"MS" },
    { name: "missouri", abbr:"MO" },
    { name: "montana", abbr:"MT" },
    { name: "nebraska", abbr:"NE" },
    { name: "nevada", abbr:"NV" },
    { name: "new hampshire", abbr:"NH" },
    { name: "new jersey", abbr:"NJ" },
    { name: "new mexico", abbr:"NM" },
    { name: "new york", abbr:"NY" },
    { name: "north carolina", abbr:"NC" },
    { name: "north dakota", abbr:"ND" },
    { name: "ohio", abbr:"OH" },
    { name: "oklahoma", abbr:"OK" },
    { name: "oregon", abbr:"OR" },
    { name: "pennsylvania", abbr:"PA" },
    { name: "rhode island", abbr:"RI" },
    { name: "south carolina", abbr:"SC" },
    { name: "south dakota", abbr:"SD" },
    { name: "tennessee", abbr:"TN" },
    { name: "texas", abbr:"TX" },
    { name: "utah", abbr:"UT" },
    { name: "vermont", abbr:"VT" },
    { name: "virginia", abbr:"VA" },
    { name: "washington", abbr:"WA" },
    { name: "west virginia", abbr:"WV" },
    { name: "wisconsin", abbr:"WI" },
    { name: "wyoming", abbr:"Wy "}
  ];

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private addProvidersGQL: AddProviderGQL,
    private providersGQL: ProvidersGQL,
    private providerGQL: ProviderGQL,
    private userService: UserService,
    private deleteProviderGQL: DeleteProviderGQL,
    private updateProviderGQL: UpdateProviderGQL
  ) {
    this.me = userService.me;
    this.myProviderQuery = {
      query: this.providersGQL.document,
      variables: {
        where: {
          owner: {
            id: this.me.id
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
    const inputs = this.searchInput.split(/\s+/);
    const input_states = this.states.filter(state => (inputs.includes(state.abbr) || inputs.includes(state.name)));
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
          { addr1_contains: input },
          { addr2_contains: input }
        ]
      }
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
          first: 10,
          skip: this.searchSkip
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          return data.providers;
        })
      );
  }

  addProvider(form) {
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
            addr1: form.get('addr1').value,
            addr2: form.get('addr2').value
          }
        }
      })
      .subscribe(res => {
        this.dialog.closeAll();
      });
  }

  updateProvider(form,id) {
    this.apollo
      .mutate({
        mutation: this.updateProviderGQL.document,
        refetchQueries: [this.myProviderQuery],
        variables: {
          data: {
            name: form.get('name').value,
            type: form.get('type').value,
            phone_number: form.get('phone_number').value,
            email: form.get('email').value,
            addr1: form.get('addr1').value,
            addr2: form.get('addr2').value
          },
          where: {
            id
          }
        }
      })
      .subscribe(res => {
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
      .subscribe();
  }

  getProviderTypes() {
    return this.serviceProviderTypes;
  }

  getProviderTypeLabel(type) {
    if (type) {
      const index = findIndex(this.serviceProviderTypes, { value: type });
      const label = this.serviceProviderTypes[index].label;
      // console.log(label);
      return label;
    }
  }
}
