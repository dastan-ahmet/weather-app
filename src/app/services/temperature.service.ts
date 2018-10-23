import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Temperature } from '../models/temperature.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) {}

  get(): Observable<Temperature[]> {
    const temps = localStorage.getItem('temperatures');
    if (!temps) {
      return this.http.get<Temperature[]>(`${appConfig.baseUrl}/temperature.json`)
        .pipe(
          map(temperatures => {
            localStorage.setItem('temperatures', JSON.stringify(temperatures));
            return temperatures;
          })
        );
    }

    return of(JSON.parse(temps));
  }
}
