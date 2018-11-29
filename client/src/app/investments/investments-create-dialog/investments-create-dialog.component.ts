import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit,
  Inject
} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvestmentsService } from '../investments.service';
import { formatCurrency, formatPercent } from '@angular/common';
import { YearsPipe } from '../../years.pipe';
import { MAT_DIALOG_DATA } from '@angular/material';

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

  investmentForm;
  action = 'Create';
  submitCb;
  submitArgs;
  priceChanged = false;

  // Used for GET params to API call
  zillow = {
    address: null,
    citystatezip: null
  };

  constructor(
    private httpClient: HttpClient,
    private investmentService: InvestmentsService,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    let investment;

    if (data) {
      this.action = 'Update';
      investment = data.investment;
    } else {
      investment = {
        address: '',
        price: '',
        monthly_rent: '',
        mortgage_downpayment: '',
        mortgage_amount: '',
        mortgage_interest_rate: 0,
        mortgage_period: 30,
        purchase_date: ''
      };
    }

    console.log(investment.mortgage_interest_rate * 100.0);

    this.investmentForm = new FormGroup({
      address: new FormControl(investment.address, Validators.required),
      price: new FormControl(investment.price, Validators.required),
      monthly_rent: new FormControl(
        investment.monthly_rent,
        Validators.required
      ),
      mortgage_downpayment: new FormControl(
        investment.mortgage_downpayment,
        Validators.required
      ),
      mortgage_amount: new FormControl(
        investment.mortgage_amount,
        Validators.required
      ),
      mortgage_interest_rate: new FormControl(
        (parseFloat(investment.mortgage_interest_rate) * 100).toPrecision(3),
        Validators.required
      ),
      mortgage_period: new FormControl(
        investment.mortgage_period,
        Validators.required
      ),
      purchase_date: new FormControl(
        investment.purchase_date,
        Validators.required
      )
    });

    // Set args
    if (data) {
      this.submitCb = this.investmentService.updateInvestment;
      this.submitArgs = [this.investmentForm, investment.id];
    } else {
      // Set submit args
      this.submitCb = this.investmentService.addInvestment;
      this.submitArgs = [this.investmentForm];
    }
  }

  ngOnInit() {
    this.investmentForm.valueChanges.subscribe(val => {
      console.log(val);
    });
  }

  onSubmit() {
    this.submitCb.apply(this.investmentService, this.submitArgs);
    // this.investmentService.addInvestment(this.investmentForm);
  }

  currencyToNumber(currency) {
    console.log(currency);
    const value = Number(currency.toString().replace(/[^0-9.-]+/g, ''));
    console.log(value);
    return value;
  }

  priceUpdated() {
    // if (this.priceChanged) {
    //   return;
    // }

    this.investmentForm.patchValue({
      mortgage_downpayment:
        this.currencyToNumber(this.investmentForm.get('price').value) * 0.2
    });
    this.investmentForm.patchValue({
      mortgage_amount:
        this.currencyToNumber(this.investmentForm.get('price').value) -
        this.currencyToNumber(
          this.investmentForm.get('mortgage_downpayment').value
        )
    });
    setTimeout(() => {
      this.downPaymentRef.nativeElement.focus();
      this.downPaymentRef.nativeElement.blur();
      this.mortgageAmountRef.nativeElement.focus();
      this.mortgageAmountRef.nativeElement.blur();
    }, 50);
    this.priceChanged = true;
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
