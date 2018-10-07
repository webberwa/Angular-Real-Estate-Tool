import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const addInvestment = gql`
  mutation addInvestment($address: String!, $price: Float, $lease: Float) {
    addInvestment(address: $address, price: $price, lease: $lease) {
      address
    }
  }
`;

declare let google;
@Component({
  selector: 'app-investments-create-dialog',
  templateUrl: './investments-create-dialog.component.html',
  styleUrls: ['./investments-create-dialog.component.css']
})
export class InvestmentsCreateDialogComponent implements AfterViewInit, OnInit {
  @ViewChild('googleAddress')
  searchElementRef: ElementRef;

  @ViewChild('priceFieldRef')
  priceFieldRef: ElementRef;

  // Used for saving to DB
  investment = {
    address: null,
    price: null,
    lease: null
  };

  investmentForm = new FormGroup({
    address: new FormControl(''),
    price: new FormControl('')
  });

  // Used for GET params to API call
  zillow = {
    address: null,
    citystatezip: null
  };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private httpClient: HttpClient,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.investmentForm.valueChanges.subscribe(console.log);
  }

  addInvestment() {
    console.log(this.investment);
    this.apollo
      .mutate({
        mutation: addInvestment,
        variables: {
          address: this.investment.address,
          price: parseFloat(this.investment.price),
          lease: parseFloat(this.investment.lease)
        }
      })
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.findAddress();
  }

  getEstimate() {
    const endpoint =
      'https://us-central1-wbit-217505.cloudfunctions.net/getZillowPropertyInfo';

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'text/xml'),
      responseType: 'text' as 'text',
      params: {
        address: this.zillow.address,
        citystatezip: this.zillow.citystatezip
      }
    };

    this.httpClient
      .get(endpoint, options)
      .toPromise()
      .then(response => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'text/xml');
        const price = xmlDoc.querySelector('zestimate amount').firstChild
          .nodeValue;

        console.log('patch value');
        this.investmentForm.patchValue({
          price
        });
        // this.investmentForm.controls.price.markAsTouched();
        // this.priceFieldRef.nativeElement.classList.add(
        //   'mat-form-field-should-float'
        // );
        // this.investmentForm.controls.price.markAsDirty();
        // this.investmentForm.controls.price.updateValueAndValidity();
      })
      .catch(console.log);
  }

  addClass() {
    this.priceFieldRef.nativeElement.classList.add(
      'mat-form-field-should-float'
    );
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

        console.log(address_components);
        // Build the zillow address format
        this.zillow.address = `${address_components[0].short_name} ${
          address_components[1].short_name
        }`;
        this.zillow.citystatezip = `${address_components[2].short_name} ${
          address_components[4].short_name
        }, ${address_components[6].short_name}`;

        this.investment.address = place.formatted_address;

        // Then get estimate
        this.getEstimate();
      });
    });
  }
}
