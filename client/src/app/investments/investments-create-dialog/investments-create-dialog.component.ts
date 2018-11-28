import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentsService } from '../investments.service';

@Component({
  selector: 'app-investments-create-dialog',
  templateUrl: './investments-create-dialog.component.html',
  styleUrls: ['./investments-create-dialog.component.css']
})
export class InvestmentsCreateDialogComponent implements OnInit {
  @ViewChild('googleAddress')
  searchElementRef: ElementRef;

  @ViewChild('downPayment')
  downPaymentRef: ElementRef;

  @ViewChild('mortgageAmount')
  mortgageAmountRef: ElementRef;

  investmentForm = new FormGroup({
    address: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    monthly_rent: new FormControl('', Validators.required),
    mortgage_downpayment: new FormControl('', Validators.required),
    mortgage_amount: new FormControl('', Validators.required),
    mortgage_interest_rate: new FormControl('', Validators.required),
    mortgage_period: new FormControl('30', Validators.required)
  });

  // Used for GET params to API call
  zillow = {
    address: null,
    citystatezip: null
  };

  constructor(
    private httpClient: HttpClient,
    private investmentService: InvestmentsService
  ) {}

  ngOnInit() {
    this.investmentForm.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onSubmit() {
    this.investmentService.addInvestment(this.investmentForm);
  }

  priceUpdated() {
    this.investmentForm.patchValue({
      mortgage_downpayment: this.investmentForm.get('price').value * 0.2
    });
    this.investmentForm.patchValue({
      mortgage_amount:
        this.investmentForm.get('price').value -
        this.investmentForm.get('mortgage_downpayment').value
    });
    setTimeout(() => {
      this.downPaymentRef.nativeElement.focus();
      this.downPaymentRef.nativeElement.blur();
      this.mortgageAmountRef.nativeElement.focus();
      this.mortgageAmountRef.nativeElement.blur();
    }, 50);
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
      })
      .catch(console.log);
  }

  onChangeAddress(result) {
    this.investmentForm.patchValue({ address: result.full_address });
  }
}
