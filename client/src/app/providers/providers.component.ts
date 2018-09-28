import { Component, OnInit } from '@angular/core';
import { faEdit, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  service_provider_type: any[] = [
    {
      label: 'All',
      value: 'all'
    },
    {
      label: 'Investors',
      value: 'investors'
    },
    {
      label: 'Contractors',
      value: 'contractors'
    },
    {
      label: 'Agents',
      value: 'agents'
    },
    {
      label: 'Properties',
      value: 'properties'
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
      address: {
        addr1: '366 48th Street',
        addr2: 'California, US',
        lat: 33.999487,
        lng: -118.279791
      }
    },
    {
      name: 'Caine Cho',
      type: 'Properties',
      rate: 4.7,
      review_number: 152,
      review: 'Professional and kind',
      phone_number: '(800) 612 - 1238',
      address: {
        addr1: '999-901 11th Street',
        addr2: 'California, US',
        lat: 34.027366,
        lng: -118.494686
      }
    }
  ];

  faEdit = faEdit;
  faUserCircle = faUserCircle;

  selected_sp = null;
  zoom_level = 16;

  default_map_pos = {
    lat: 34.020395,
    lng: -118.288627
  };

  constructor() {}

  ngOnInit() {}

  onClickServiceProvider(service_provider) {
    this.selected_sp = service_provider;
    this.zoom_level = 16;
  }
}
