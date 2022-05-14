import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ResourceEnum} from "src/app/enums/resource.enum";
import {RestApiService} from "../core/rest-api.service";
import {HttpParams} from '@angular/common/http';
import {OpenWeatherSummaryList} from '../../model/interfaces/weather/open-weather.model';
import {OpenWeatherForecast} from '../../model/interfaces/weather/open-weather-forecast.model';

/**
 * Http service for OpenWeatherMap
 */
@Injectable()
export class WeatherService {
  private readonly API = ResourceEnum.OPEN_WEATHER_MAP;
  private readonly IMAGES = ResourceEnum.OPEN_WEATHER_IMAGES;

  constructor(private readonly restApiService: RestApiService) {
  }

  getWeatherSummary(citiesIds: string): Observable<OpenWeatherSummaryList> {
    const param: HttpParams = new HttpParams()
      .set('limit', 5)
      .set('units', 'metric')
      .set('id', citiesIds);
    return this.restApiService.get(this.API, 'data/2.5/group', param);
  }

  getForecast(lat: number, lon: number): Observable<OpenWeatherForecast> {
    const param: HttpParams = new HttpParams()
      .set('units', 'metric')
      .set('lon', lon)
      .set('lat', lat);
    return this.restApiService.get(this.API, 'data/2.5/onecall', param);
  }

  apiKeyCheck(apiKey: string): Observable<OpenWeatherSummaryList> {
    const londonId = '2643743';

    const param: HttpParams = new HttpParams()
      .set('limit', 1)
      .set('units', 'metric')
      .set('id', londonId)
      .set('health-check', true)
      .set('appid', apiKey);
    return this.restApiService.get(this.API, 'data/2.5/group', param);
  }

  weatherImgUrl(): string {
    return this.restApiService.getUrl(this.IMAGES, 'img/wn');
  }
}
