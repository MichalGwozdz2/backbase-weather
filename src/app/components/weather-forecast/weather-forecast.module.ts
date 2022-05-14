import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherForecastComponent} from './weather-forecast.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatChipsModule} from '@angular/material/chips';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ],
  imports: [
    CommonModule,

    TranslateModule.forChild(),
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class WeatherForecastModule {
}
