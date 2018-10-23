import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PrecipitationService } from 'src/app/services/precipitation.service';
import { FilterService } from 'src/app/services/filter.service';
import { Precipitation } from 'src/app/models/precipitation.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-precipitation',
  templateUrl: './precipitation.component.html',
  styleUrls: ['./precipitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrecipitationComponent implements OnInit {

  title = 'Осадки';
  years: number[] = [];
  precipitations: Precipitation[];
  series;
  filter;

  constructor(
    private precipitationService: PrecipitationService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filter = {
      yearFrom: this.filterService.yearFrom,
      yearTo: this.filterService.yearTo
    };
    this.filterService.yearFrom$.subscribe(yearFrom => {
      this.filter.yearFrom = yearFrom;
      this.getPrecipitation();
    });
    this.filterService.yearTo$.subscribe(yearTo => {
      this.filter.yearTo = yearTo;
      this.getPrecipitation();
    });
  }

  getPrecipitation() {
    this.precipitationService.get().subscribe(precipitations => {
      const groupedByYears = {};
      precipitations.forEach(precipitation => {
        const date = new Date(precipitation.t);
        const year = date.getFullYear();
        this.setYears(year);
      });
      const yearsRange = this.years.filter(year => {
        return year >= this.filter.yearFrom && this.filter.yearTo >= year;
      });
      yearsRange.forEach(year => {
        precipitations.forEach(precipitation => {
        const date = new Date(precipitation.t);
        const tYear = date.getFullYear();
        if (tYear === year) {
          if (!groupedByYears.hasOwnProperty(year)) {
            groupedByYears[year] = [];
          }
          groupedByYears[year].push(precipitation.v);
        }
        });
      });
      const data = this.getAverageForYears(groupedByYears);
      this.series = {
        name: 'Осадки',
        data: data
      };
    });
  }

  setYears(year) {
    if (!this.years.includes(year)) {
      this.years.push(year);
    }
  }

  getAverageForYears(groupedByYears) {
    return Object.keys(groupedByYears).map(year => {
      return this.getAverageValue(groupedByYears[year]);
    });
  }

  getAverageValue(data) {
    const length = data.length;
    if (length) {
      const sum = data.reduce((a, b) => a + b);
      const averageValue = sum / length;
      return parseFloat(averageValue.toFixed(2));
    }
  }
}
