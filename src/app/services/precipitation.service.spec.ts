/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrecipitationService } from './precipitation.service';

describe('Service: Precipitation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrecipitationService]
    });
  });

  it('should ...', inject([PrecipitationService], (service: PrecipitationService) => {
    expect(service).toBeTruthy();
  }));
});
