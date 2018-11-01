import { Injectable } from '@angular/core';
import instantsearch from 'instantsearch.js/es';

@Injectable({
  providedIn: 'root'
})
export class InstantsearchService {
  search = instantsearch({
    appId: 'TQ3TDPJYHR',
    apiKey: 'ed3af9a9740039b6a5bc0a92e68075cd',
    indexName: 'dev_WBIT',
    urlSync: true
  });

  constructor() {}
}
