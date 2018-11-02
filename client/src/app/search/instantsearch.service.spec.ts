import { TestBed } from '@angular/core/testing';

import { InstantsearchService } from './instantsearch.service';

describe('InstantsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstantsearchService = TestBed.get(InstantsearchService);
    expect(service).toBeTruthy();
  });
});
