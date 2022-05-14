import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {environment} from 'src/environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ENVIRONMENT} from './injection-tokens/environment.token';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ErrorInterceptor} from './interceptors/core/error.interceptor';
import {WeatherApiKeyInterceptor} from './interceptors/weather/weather-api-key.interceptor';
import {WeatherService} from './services/weather/weather.service';
import {WeatherApiKeyStore} from './services/weather/weather-api-key.store';
import {WeatherCitiesStore} from './services/weather/weather-cities.store';
import {WeatherApiKeyModule} from './modals/weather-api-key/weather-api-key.module';
import {MatDialogModule} from '@angular/material/dialog';
import {Chart, registerables} from 'chart.js';

import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoaderModule} from './modals/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    WeatherApiKeyModule,
    LoaderModule,

    MatSnackBarModule,
    MatDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    WeatherService,
    WeatherApiKeyStore,
    WeatherCitiesStore,

    {provide: ENVIRONMENT, useValue: environment},
    {provide: HTTP_INTERCEPTORS, useClass: WeatherApiKeyInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly translate: TranslateService) {
    Chart.register(...registerables);
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
