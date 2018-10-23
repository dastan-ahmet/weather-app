/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TemperatureService } from './temperature.service';

describe('Service: Temperature', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureService]
    });
  });

  it('should ...', inject([TemperatureService], (service: TemperatureService) => {
    expect(service).toBeTruthy();
  }));
});
