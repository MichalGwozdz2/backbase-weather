import {TestBed, waitForAsync} from '@angular/core/testing';

import {of, take} from 'rxjs';
import {WeatherService} from './weather.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RestApiService} from '../core/rest-api.service';
import {ResourceEnum} from '../../enums/resource.enum';
import {HttpParams} from '@angular/common/http';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherService,
        {
          provide: RestApiService,
          useValue: {
            get: () => of(true),
            getUrl: () => 'test'
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(WeatherService);
  })

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return weather summary', () => {
    const param: HttpParams = new HttpParams()
      .set('limit', 5)
      .set('units', 'metric')
      .set('id', 'test');
    const spy = spyOn(service['restApiService'], 'get').and.callThrough();

    service.getWeatherSummary('test').pipe(take(1)).subscribe();

    expect(spy).toHaveBeenCalledWith(ResourceEnum.OPEN_WEATHER_MAP, 'data/2.5/group', param);
  });

  it('should return forecast', () => {
    const param: HttpParams = new HttpParams()
      .set('units', 'metric')
      .set('lon', 456)
      .set('lat', 123);
    const spy = spyOn(service['restApiService'], 'get').and.callThrough();

    service.getForecast(123, 456).pipe(take(1)).subscribe();

    expect(spy).toHaveBeenCalledWith(ResourceEnum.OPEN_WEATHER_MAP, 'data/2.5/onecall', param);
  });

  it('should return keycheck', () => {
    const londonId = '2643743';

    const param: HttpParams = new HttpParams()
      .set('limit', 1)
      .set('units', 'metric')
      .set('id', londonId)
      .set('health-check', true)
      .set('appid', 'test');
    const spy = spyOn(service['restApiService'], 'get').and.callThrough();

    service.apiKeyCheck('test').pipe(take(1)).subscribe();

    expect(spy).toHaveBeenCalledWith(ResourceEnum.OPEN_WEATHER_MAP, 'data/2.5/group', param);
  });

  it('should return weatherImgUrl', () => {
    const spy = spyOn(service['restApiService'], 'getUrl').and.callThrough();

    service.weatherImgUrl();

    expect(spy).toHaveBeenCalled();
  })

});
