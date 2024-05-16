import { TestBed } from '@angular/core/testing';

import { FoodDescService } from './food-desc.service';

describe('FoodDescService', () => {
  let service: FoodDescService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodDescService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
