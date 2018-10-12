import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {AddProviderGQL, MeGQL, ProvidersGQL, UserGQL} from "../apollo-angular-services";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  service_provider_type_list: any[] = [
    {
      label: "All",
      value: "All"
    },
    {
      label: "Investors",
      value: "Investor"
    },
    {
      label: "Contractors",
      value: "Contractor"
    },
    {
      label: "Agents",
      value: "Agent"
    },    {
      label: "Properties",
      value: "Property"
    }
  ];

  service_provider_list: any[] = [
    {
      name: 'El Rapido',
      type: 'Contractor',
      rate: 3.0,
      review_number: 50,
      review: 'Excellent service, fast and economic.',
      phone_number: '(418) 345 - 8798',
      email: 'elrapi@gmail.com',
      address: {
        addr1: '345 Trigger Street',
        addr2: 'California, US',
        lat: 34.248147,
        lng: -118.62418
      }
    },
    {
      name: 'John Smith',
      type: 'Agent',
      rate: 4.0,
      review_number: 35,
      review: 'The best agent in southern California',
      phone_number: '(418) 365 - 9793',
      email: 'John.Smith@gmail.com',
      address: {
        addr1: '367 5th Avenue',
        addr2: 'California, US',
        lat: 33.996901,
        lng: -118.472855
      }
    },
    {
      name: 'Donal Trump',
      type: 'Investor',
      rate: 1.0,
      review_number: 90,
      review: 'Investor with good experience',
      phone_number: '(418) 345 - 8798',
      email: 'D.T.estate@gmail.com',
      address: {
        addr1: '366 48th Street',
        addr2: 'California, US',
        lat: 33.999487,
        lng: -118.279791
      }
    },
    {
      name: 'Caine Cho',
      type: "Property",
      rate: 4.7,
      review_number: 152,
      review: 'Professional and kind',
      phone_number: '(800) 612 - 1238',
      email: 'caine.cho@gmail.com',
      address: {
        addr1: '999-901 11th Street',
        addr2: 'California, US',
        lat: 34.027366,
        lng: -118.494686
      }
    },
    {
      name: 'El Rapido',
      type: 'Contractor',
      rate: 3.0,
      review_number: 50,
      review: 'Excellent service, fast and economic.',
      phone_number: '(418) 345 - 8798',
      email: 'elrapi@gmail.com',
      address: {
        addr1: '345 Trigger Street',
        addr2: 'California, US',
        lat: 34.248147,
        lng: -118.62418
      }
    },
    {
      name: 'John Smith',
      type: 'Agent',
      rate: 4.0,
      review_number: 35,
      review: 'The best agent in southern California',
      phone_number: '(418) 365 - 9793',
      email: 'John.Smith@gmail.com',
      address: {
        addr1: '367 5th Avenue',
        addr2: 'California, US',
        lat: 33.996901,
        lng: -118.472855
      }
    },
    {
      name: 'Donal Trump',
      type: 'Investor',
      rate: 1.0,
      review_number: 90,
      review: 'Investor with good experience',
      phone_number: '(418) 345 - 8798',
      email: 'D.T.estate@gmail.com',
      address: {
        addr1: '366 48th Street',
        addr2: 'California, US',
        lat: 33.999487,
        lng: -118.279791
      }
    },
    {
      name: 'Caine Cho',
      type: "Property",
      rate: 4.7,
      review_number: 152,
      review: 'Professional and kind',
      phone_number: '(800) 612 - 1238',
      emial: 'caine.cho@gmail.com',
      address: {
        addr1: '999-901 11th Street',
        addr2: 'California, US',
        lat: 34.027366,
        lng: -118.494686
      }
    },
    {
      name: 'El Rapido',
      type: 'Contractor',
      rate: 3.0,
      review_number: 50,
      review: 'Excellent service, fast and economic.',
      phone_number: '(418) 345 - 8798',
      email: 'elrapi@gmail.com',
      address: {
        addr1: '345 Trigger Street',
        addr2: 'California, US',
        lat: 34.248147,
        lng: -118.62418
      }
    },
    {
      name: 'John Smith',
      type: 'Agent',
      rate: 4.0,
      review_number: 35,
      review: 'The best agent in southern California',
      phone_number: '(418) 365 - 9793',
      email: 'John.Smith@gmail.com',
      address: {
        addr1: '367 5th Avenue',
        addr2: 'California, US',
        lat: 33.996901,
        lng: -118.472855
      }
    },
    {
      name: 'Donal Trump',
      type: 'Investor',
      rate: 1.0,
      review_number: 90,
      review: 'Investor with good experience',
      phone_number: '(418) 345 - 8798',
      email: 'D.T.estate@gmail.com',
      address: {
        addr1: '366 48th Street',
        addr2: 'California, US',
        lat: 33.999487,
        lng: -118.279791
      }
    },
    {
      name: 'Caine Cho',
      type: "Property",
      rate: 4.7,
      review_number: 152,
      review: 'Professional and kind',
      phone_number: '(800) 612 - 1238',
      emial: 'caine.cho@gmail.com',
      address: {
        addr1: '999-901 11th Street',
        addr2: 'California, US',
        lat: 34.027366,
        lng: -118.494686
      }
    }
  ];

  service_provider_type = "All";

  selected_sp = null;
  zoom_level = 16;

  hover_sp = null;

  private serviceProviders;

  constructor(private ref: ChangeDetectorRef,
              private apollo: Apollo,
              private providerGQL: ProvidersGQL,
              private addProviderGQL: AddProviderGQL) {
    this.apollo
      .mutate({
        mutation: this.addProviderGQL.document,
        variables: {
          data: {
            name: "teset1",
            phone: 1234
          }
        },
        refetchQueries: [
          {
            query: this.providerGQL.document
          }
        ]
      })
      .subscribe(
        res => {},
        err => {
          console.log(err.graphQLErrors);
        }
      );

  }

  ngOnInit() {
    this.ref.detectChanges();
  }

  onClickServiceProvider(service_provider) {
    this.selected_sp = service_provider;
    this.zoom_level = 16;
  }

  filterServiceProvider() {
    if (this.service_provider_type == "All") {
      return this.service_provider_list;
    }

    return this.service_provider_list.filter(sp => sp.type == this.service_provider_type);
  }

  hoverServiceProvider(sp) {
    this.hover_sp = sp;
  }
}
