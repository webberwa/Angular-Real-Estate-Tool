import { TestBed } from '@angular/core/testing';

import { InvestmentsService } from './investments.service';

describe('InvestmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestmentsService = TestBed.get(InvestmentsService);
    expect(service).toBeTruthy();
  });
});
