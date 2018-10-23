import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemperatureComponent } from './containers/temperature/temperature.component';
import { PrecipitationComponent } from './containers/precipitation/precipitation.component';

const routes: Routes = [
  { path: 'temperature', component: TemperatureComponent },
  { path: 'precipitation', component: PrecipitationComponent },
  { path: '', pathMatch: 'full', redirectTo: 'temperature' },
  { path: '**', pathMatch: 'full', redirectTo: 'temperature' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
