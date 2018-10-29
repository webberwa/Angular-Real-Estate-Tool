import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../providers.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  providerTypes;
  constructor(private providersService: ProvidersService) {
    this.providerTypes = providersService.getProviderTypes();
  }

  ngOnInit() {}
}
