import {
  Directive,
  ElementRef,
  HostListener,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { formatCurrency } from '@angular/common';

@Directive({
  selector: '[appCurrency]'
})
export class CurrencyDirective {
  el;
  constructor(el: ElementRef) {
    this.el = el;
    console.log('currency directive');
  }

  @HostListener('keyup')
  onKeyUp() {
    // const value = this.currencyToNumber(this.el.nativeElement.value);
    // console.log(value);
    // const formattedValue = formatCurrency(value, 'en_EN', '$');
    // this.el.nativeElement.value = formattedValue;
    // console.log(formattedValue);
  }

  // @HostListener('change')
  // onChange() {
  //   console.log('on change');
  //   console.log(this.el.nativeElement.value);
  //   // formatCurrency(value, 'en_EN', '$')
  // }

  @HostListener('focus')
  onMouseEnter() {
    console.log(this.el.nativeElement.value);
    // formatCurrency(value, 'en_EN', '$')
  }

  @HostListener('blur')
  onMouseLeave() {
    const value = this.currencyToNumber(this.el.nativeElement.value);
    const formattedValue = formatCurrency(value, 'en_EN', '$');
    this.el.nativeElement.value = formattedValue;
  }

  private currencyToNumber(currency) {
    console.log(currency);
    return Number(currency.replace(/[^0-9.-]+/g, ''));
  }
}
