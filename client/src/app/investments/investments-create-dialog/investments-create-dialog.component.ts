import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare let google;
@Component({
  selector: 'app-investments-create-dialog',
  templateUrl: './investments-create-dialog.component.html',
  styleUrls: ['./investments-create-dialog.component.css']
})
export class InvestmentsCreateDialogComponent implements AfterViewInit, OnInit {
  @ViewChild('googleAddress')
  searchElementRef: ElementRef;

  investment = {
    address: null,
    price: null
  };

  zillow_address;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {}

  submit() {
    console.log(this.investment);
  }

  ngAfterViewInit(): void {
    this.findAddress();
  }

  getEstimate() {
    const zillowApiKey = 'X1-ZWz18cjuillzpn_2599m';
    const address = '2114+Bigelow+Ave&citystatezip=Seattle%2C+WA';
    const zillowEndpoint = `http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${zillowApiKey}&address=${address}`;

    console.log(zillowEndpoint);

    // const headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/xml'
    // });
    const headers = new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .append('Access-Control-Allow-Origin', '*');

    console.log(headers);

    const options = {
      headers,
      responseType: 'text' as 'text'
    };

    this.httpClient
      .get(zillowEndpoint, options)
      .toPromise()
      .then(response => {
        console.log(response);
      })
      .catch(console.log);
  }

  findAddress() {
    this.mapsAPILoader.load().then(() => {
      console.log('load');
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const { address_components } = place;

        // Build the zillow address format
        const street_address = `${address_components[0].short_name} ${
          address_components[1].short_name
        }`;
        const city_state = `${address_components[3].short_name}, ${
          address_components[5].short_name
        }`;

        this.zillow_address = `${street_address}&${city_state}`;
        this.investment.address = place.formatted_address;

        // Then get estimate
        this.getEstimate();
      });
    });
  }
}
