import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from './models/menu-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  menuItems: MenuItem[];

  ngOnInit() {
    this.menuItems = [
      { title: 'Температура', path: 'temperature' },
      { title: 'Осадки', path: 'precipitation' },
    ];
  }
}
