import { TestBed } from '@angular/core/testing';

import { ProvidersService } from './providers.service';

describe('ProvidersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvidersService = TestBed.get(ProvidersService);
    expect(service).toBeTruthy();
  });
});
