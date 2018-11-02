import { InstantsearchService } from './../../search/instantsearch.service';
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
  state: { query: string; refine: Function } = {
    query: '',
    refine() {}
  };

  constructor(
    private providersService: ProvidersService,
    private searchService: InstantsearchService
  ) {
    this.providerTypes = providersService.getProviderTypes();
  }

  ngOnInit() {
    const widget = connectSearchBox(this.updateState);
    this.searchService.search.addWidget(widget());
  }

  handleChange(query) {
    this.state.refine(query);
  }

  updateState = (state, isFirstRendering) => {
    // asynchronous update of the state
    // avoid `ExpressionChangedAfterItHasBeenCheckedError`
    if (isFirstRendering) {
      return Promise.resolve(null).then(() => {
        this.state = state;
      });
    }

    this.state = state;
  }
}
