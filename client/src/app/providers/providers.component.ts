import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { ProvidersGQL } from '../apollo-angular-services';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { ProvidersService } from './providers.service';
import { InstantsearchService } from '../search/instantsearch.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvidersComponent implements OnInit {
  allProviders;
  searchForm = new FormGroup({
    text: new FormControl(''),
    type: new FormControl('')
  });
  providerTypes;
  // Number of items
  length = 50;
  // number of items per page
  pageSize = 10;
  // MatPaginator Output
  constructor(
    private ref: ChangeDetectorRef,
    private searchService: InstantsearchService,
    private router: Router,
    private apollo: Apollo,
    private providerGQL: ProvidersGQL,
    private providersService: ProvidersService
  ) {
    this.allProviders = providersService.searchProviders();
    this.providerTypes = providersService.getProviderTypes();
  }

  ngOnInit() {}

  handleChange(text) {
    this.providersService.searchInput = text;
    this.search();
  }

  handleTypeChange(type) {
    this.providersService.searchType = type;
    this.search();
  }

  search() {
    this.allProviders = this.providersService.searchProviders();
  }

  onPaginateChange(event) {
    this.providersService.searchSkip = event.pageIndex * this.pageSize;
    console.log(event);
    this.allProviders = this.providersService.searchProviders();
  }
}
