import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {WeatherWidgetModule} from '../../components/weather-widget/weather-widget.module';
import {WeatherFilterBarModule} from '../../components/weather-filter-bar/weather-filter-bar.module';
import {WeatherForecastModule} from '../../components/weather-forecast/weather-forecast.module';

const routes: Routes = [
  {
    path: '',
    component: WeatherComponent
  },
];

@NgModule({
  declarations: [
    WeatherComponent
  ],
  exports: [
    WeatherComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),

    WeatherFilterBarModule,
    WeatherWidgetModule,
    WeatherForecastModule,
  ],
})
export class WeatherModule {
}
