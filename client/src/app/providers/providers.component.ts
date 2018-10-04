import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

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
      type: "Property",
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
    },
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
      type: "Property",
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
    },
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
      type: "Property",
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

  service_provider_type = "All";

  selected_sp = null;
  zoom_level = 16;

  default_map_pos = {
    lat: 34.020395,
    lng: -118.288627
  };

  options = [
    "AL (Alabama)",
    "AK (Alaska)",
    "AZ (Arizona)",
    "AR (Arkansas)",
    "CA (California)",
    "CO (Colorado)",
    "CT (Connecticut)",
    "DE (Delaware)",
    "FL (Florida)",
    "GA (Georgia)",
    "HI (Hawaii)",
    "ID (Idaho)",
    "IL (Illinois)",
    "IN (Indiana)",
    "IA (Iowa)",
    "KS (Kansas)",
    "KY (Kentucky)",
    "LA (Louisiana)",
    "ME (Maine)",
    "MD (Maryland)",
    "MA (Massachusetts)",
    "MI (Michigan)",
    "MN (Minnesota)",
    "MS (Mississippi)",
    "MO (Missouri)",
    "MT (Montana)",
    "NE (Nebraska)",
    "NV (Nevada)",
    "NH (New Hampshire)",
    "NJ (New Jersey)",
    "NM (New Mexico)",
    "NY (New York)",
    "NC (North Carolina)",
    "ND (North Dakota)",
    "OH (Ohio)",
    "OK (Oklahoma)",
    "OR (Oregon)",
    "PA (Pennsylvania)",
    "RI (Rhode Island)",
    "SC (South Carolina)",
    "SD (South Dakota)",
    "TN (Tennessee)",
    "TX (Texas)",
    "UT (Utah)",
    "VT (Vermont)",
    "VA (Virginia)",
    "WA (Washington)",
    "WV (West Virginia)",
    "WI (Wisconsin)",
    "WY (Wyoming)"
  ];

  rating = [
    { label: "★", score: 1 },
    { label: "★★", score: 2 },
    { label: "★★★", score: 3 },
    { label: "★★★★", score: 4 },
    { label: "★★★★★", score: 5 }
  ]

  constructor(private ref: ChangeDetectorRef) {}

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
}
