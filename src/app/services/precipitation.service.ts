import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { Precipitation } from '../models/precipitation.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrecipitationService {

  constructor(private http: HttpClient) {}

  get(): Observable<Precipitation[]> {
    const precips = localStorage.getItem('precipitations');
    if (!precips) {
      return this.http.get<Precipitation[]>(`${appConfig.baseUrl}/precipitation.json`)
        .pipe(
          map(precipitations => {
            localStorage.setItem('precipitations', JSON.stringify(precipitations));
            return precipitations;
          })
        );
    }

    return of(JSON.parse(precips));
  }
}
