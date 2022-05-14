import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherApiKeyComponent} from './weather-api-key.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    WeatherApiKeyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    TranslateModule.forChild(),

    MatInputModule,
    MatButtonModule
  ]
})
export class WeatherApiKeyModule { }
