import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {
  AddProviderGQL,
  ProvidersGQL,
  ProviderGQL
} from '../apollo-angular-services';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';
import { findIndex } from 'lodash';
import { DeleteProviderGQL } from '../apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  public myProviders;
  private me;

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

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private addProvidersGQL: AddProviderGQL,
    private providersGQL: ProvidersGQL,
    private providerGQL: ProviderGQL,
    private userService: UserService,
    private deleteProviderGQL: DeleteProviderGQL
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

  allProviders() {
    return this.providersGQL.watch().valueChanges.pipe(
      map(({ data }: { data: any }) => {
        console.log(data.providers);
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
