import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherWidgetComponent} from './weather-widget.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    declarations: [
        WeatherWidgetComponent
    ],
    exports: [
        WeatherWidgetComponent
    ],
  imports: [
    CommonModule,

    TranslateModule.forChild(),

    MatExpansionModule
  ]
})
export class WeatherWidgetModule { }
