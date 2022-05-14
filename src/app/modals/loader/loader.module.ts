import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoaderComponent} from './loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from '../../services/core/loader.service';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,

    MatProgressSpinnerModule
  ],
  providers: [
    LoaderService
  ]
})
export class LoaderModule {
}
