import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
  @Input() years: Date[];
  yearFrom: number;
  yearTo: number;

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.yearFrom = this.filterService.getYearFrom();
    this.yearTo = this.filterService.getYearTo();
  }

  onYearFromChange($event) {
    this.filterService.setYearFrom($event.target.value);
  }

  onYearToChange($event) {
    this.filterService.setYearTo($event.target.value);
  }

}
