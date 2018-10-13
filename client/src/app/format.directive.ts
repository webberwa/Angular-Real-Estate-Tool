import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appFormat]'
})
export class FormatDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnInit() {
    const value = this.el.nativeElement.getElementsByTagName('input');
    console.log(value);
  }

  @HostListener('input', ['$event'])
  onEvent($event) {
    console.log('on event');
    const valueToTransform = this.el.nativeElement.value;
    console.log(valueToTransform);
    // do something with the valueToTransform
    this.control.control.setValue(valueToTransform);
  }
}
