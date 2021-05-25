
import { TestBed } from '@angular/core/testing';
import { Address } from '../models/Address';

import { Address } from './address.service';

describe('ClientService', () => {
  let service: address;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(address);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
