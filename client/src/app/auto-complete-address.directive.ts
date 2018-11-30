import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {auto} from 'async';

declare let google;
@Directive({
  selector: '[appAutoCompleteAddress]'
})
export class AutoCompleteAddressDirective implements OnInit {
  @Input() appAutoCompleteAddress: any;

  constructor(private el: ElementRef,
              private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    this.setAutoComplete();
  }

  private setAutoComplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete: any = new google.maps.places.Autocomplete(this.el.nativeElement);

      if (this.appAutoCompleteAddress != null && this.appAutoCompleteAddress !== undefined) {
        const callback = () => {
          if (this.appAutoCompleteAddress != null && this.appAutoCompleteAddress !== undefined) {
            this.appAutoCompleteAddress(this.refineAddress(autocomplete.getPlace()));
          }
        };
        callback.bind(this);

        autocomplete.addListener('place_changed', callback);
      }
    });
  }

  private refineAddress(place) {
    const full_address = place.formatted_address;
    const address = place.name;
    const city = place.address_components.filter(item => item.types.includes('locality')).map(item => item.long_name);
    const state = place.address_components.filter(item => item.types.includes('administrative_area_level_1')).map(item => item.short_name);
    const zip_code = place.address_components.filter(item => item.types.includes('postal_code')).map(item => item.long_name);
    const lat = place.geometry.location.lat();
    const long = place.geometry.location.lng();

    if ([city, state, zip_code].some(item => item.length === 0)) {
      return {
        full_address,
        validate: false
      };
    }

    return {
      full_address,
      address,
      city: city[0],
      state: state[0],
      zip_code: zip_code[0],
      validate: true,
      long,
      lat
    };
  }
}
