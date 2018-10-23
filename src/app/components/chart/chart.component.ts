import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() title = '';
  @Input() series: [];
  chart: Chart =  new Chart({
    chart: {
      type: 'line',
      renderTo: '#chart'
    },
    title: {
      text: ''
    },
    // boost: {
    //   useGPUTranslations: true
    // },
    // plotOptions: {
    //   line: {
    //     dataLabels: {
    //       enabled: true
    //     },
    //     enableMouseTracking: false
    //   }
    // },
    credits: {
      enabled: false
    },
    series: []
  });

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const title = changes['title'] ? changes['title'].currentValue : this.title;
    const series = changes['series'].currentValue;
    this.setTitle(title);
    this.setSeries(series);
  }

  async setTitle(title) {
    const chart = await this.chart;
    const chartRef = chart.ref;
    chartRef.title.update({ text: title });
  }

  setSeries(series) {
    console.log(series)
    this.chart.removeSeries(0);
    this.chart.addSeries(series);
  }
}
