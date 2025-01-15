import { TestBed } from '@angular/core/testing';

import { HomeDataServiceService } from './home-data-service.service';

describe('HomeDataServiceService', () => {
  let service: HomeDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
