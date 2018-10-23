import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TemperatureService } from 'src/app/services/temperature.service';
import { map } from 'rxjs/operators';
import { Temperature } from 'src/app/models/temperature.model';
import { ChartSeries } from 'src/app/models/chart-series.model';
import { FilterService } from 'src/app/services/filter.service';
import { Subject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemperatureComponent implements OnInit {
  title = 'Температура';
  years$: Observable<number[]>;
  years: number[] = [];
  temperatures: Temperature[];
  series;
  seriesData = [];
  series$: Observable<{}>;
  filter;

  constructor(
    private temperatureService: TemperatureService,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filter = {
      yearFrom: this.filterService.yearFrom,
      yearTo: this.filterService.yearTo
    };
    this.filterService.yearFrom$.subscribe(yearFrom => {
      this.filter.yearFrom = yearFrom;
      this.getTemperature();
    });
    this.filterService.yearTo$.subscribe(yearTo => {
      this.filter.yearTo = yearTo;
      this.getTemperature();
    });
  }

  getTemperature() {
    this.temperatureService.get().subscribe(temperatures => {
      const groupedByYears = {};
      temperatures.forEach(temperature => {
        const date = new Date(temperature.t);
        const year = date.getFullYear();
        this.setYears(year);
      });
      this.years$ = of(this.years);
      const yearsRange = this.years.filter(year => {
        return year >= this.filter.yearFrom && this.filter.yearTo >= year;
      });
      yearsRange.forEach(year => {
        temperatures.forEach(temperature => {
          const date = new Date(temperature.t);
          const tYear = date.getFullYear();
          if (tYear === year) {
            if (!groupedByYears.hasOwnProperty(year)) {
              groupedByYears[year] = [];
            }
            groupedByYears[year].push(temperature.v);
          }
        });
      });
      const data = this.getAverageForYears(groupedByYears);
      this.series = {
        name: 'Температура',
        data: data
      };
      this.series$ = of(this.series);
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
