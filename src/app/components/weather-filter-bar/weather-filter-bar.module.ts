import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherFilterBarComponent} from './weather-filter-bar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    WeatherFilterBarComponent
  ],
  exports: [
    WeatherFilterBarComponent
  ],
  imports: [
    CommonModule,

    TranslateModule.forChild(),

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatSelectModule
  ]
})
export class WeatherFilterBarModule { }
