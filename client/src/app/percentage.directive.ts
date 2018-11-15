import { Directive, ElementRef, HostListener } from '@angular/core';
import { formatPercent } from '@angular/common';

@Directive({
  selector: '[appPercentage]'
})
export class PercentageDirective {
  el;
  constructor(el: ElementRef) {
    this.el = el;
  }
  @HostListener('blur')
  onMouseLeave() {
    const value = this.toNumber(this.el.nativeElement.value) / 100;
    console.log(value);
    const formattedValue = formatPercent(value, 'en_EN', '1.1-2');
    this.el.nativeElement.value = formattedValue;
  }

  private toNumber(value) {
    return Number(value.replace(/[^0-9.-]+/g, ''));
  }
}
