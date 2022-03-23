import { TestBed } from '@angular/core/testing';

import { AvService } from './av.service';

describe('AvService', () => {
  let service: AvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
