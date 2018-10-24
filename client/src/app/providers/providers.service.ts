import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {
  AddProviderGQL,
  ProvidersGQL,
  ProviderGQL
} from '../apollo-angular-services';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  public myProviders;
  allProviders;

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
    private apollo: Apollo,
    private addProvidersGQL: AddProviderGQL,
    private providersGQL: ProvidersGQL,
    private providerGQL: ProviderGQL,
    private userService: UserService
  ) {
    const user = userService.me;
    this.myProviders = this.apollo
      .watchQuery({
        query: this.providersGQL.document,
        variables: {
          where: {
            owner: {
              id: user.id
            }
          }
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log(data);
          return data.providers;
        })
      );

    this.allProviders = this.providersGQL.watch().valueChanges.pipe(
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

  getProviderTypes() {
    return this.serviceProviderTypes;
  }
}
