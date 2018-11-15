import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../providers.service';
import { connectSearchBox } from 'instantsearch.js/es/connectors';
import { connectHits } from 'instantsearch.js/es/connectors';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  searchForm = new FormGroup({
    text: new FormControl(''),
    type: new FormControl('')
  });
  providerTypes;
  // Define SearchBox initial state

  constructor(private providersService: ProvidersService) {
    this.providerTypes = providersService.getProviderTypes();
  }

  ngOnInit() {}

  handleChange() {}
}
