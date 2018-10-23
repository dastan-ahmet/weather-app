import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  yearFrom = 1881;
  yearTo = 2006;
  yearFrom$: BehaviorSubject<number> = new BehaviorSubject<number>(this.yearFrom);
  yearTo$: BehaviorSubject<number> = new BehaviorSubject<number>(this.yearTo);

  constructor() { }

  getYearFrom(): number {
    return this.yearFrom;
  }

  getYearTo(): number {
    return this.yearTo;
  }

  setYearFrom(year) {
    this.yearFrom$.next(year);
    this.yearFrom = year;
  }

  setYearTo(year) {
    this.yearTo$.next(year);
    this.yearTo = year;
  }

}
