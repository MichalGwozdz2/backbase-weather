import {TestBed, waitForAsync} from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {take} from 'rxjs';
import {WeatherApiKeyInterceptor} from './weather-api-key.interceptor';
import {WeatherApiKeyStore} from 'src/app/services/weather/weather-api-key.store';

describe('WeatherApiKeyInterceptor', () => {
  let service: WeatherApiKeyInterceptor;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherApiKeyInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: WeatherApiKeyInterceptor,
          multi: true
        },
        {
          provide: WeatherApiKeyStore,
          useValue: {
            getApiKey: () => 'key'
          }
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    client = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(WeatherApiKeyInterceptor);
  })

  it('should create', () => {
    expect(client).toBeTruthy();
    expect(controller).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should add appid param for openweathermap url', (done) => {
    client.get('/openweathermap')
      .pipe(
        take(1),
      ).subscribe(() => done());

    controller.expectOne(req => {
      expect(req.params.has('appid')).toBeTruthy();
      return req.params.has('appid');
    }).flush({});
  });

  it('should not add appid param for test url', (done) => {
    client.get('/test')
      .pipe(
        take(1),
      ).subscribe(() => done());

    controller.expectOne(req => {
      expect(!req.params.has('appid')).toBeTruthy();
      return !req.params.has('appid');
    }).flush({});
  });

  it('should not add appid param for openweathermap url and added heath-check param', (done) => {
    client.get('/test', {params: new HttpParams().set('health-check', true)})
      .pipe(
        take(1),
      ).subscribe(() => done());

    controller.expectOne(req => {
      expect(!req.params.has('appid')).toBeTruthy();
      return !req.params.has('appid');
    }).flush({});
  });
});
