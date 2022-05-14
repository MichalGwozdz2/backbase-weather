import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WeatherComponent} from './weather.component';
import {MockComponents} from 'ng-mocks';
import {WeatherFilterBarComponent} from '../../components/weather-filter-bar/weather-filter-bar.component';
import {WeatherWidgetComponent} from '../../components/weather-widget/weather-widget.component';
import {WeatherForecastComponent} from '../../components/weather-forecast/weather-forecast.component';
import {LoaderService} from '../../services/core/loader.service';
import {WeatherService} from '../../services/weather/weather.service';
import {of} from 'rxjs';
import {OpenWeatherSummaryList} from '../../model/interfaces/weather/open-weather.model';
import {Weather} from '../../model/classes/weather/weather.model';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;

  const weatherSummary: OpenWeatherSummaryList = {
    list: [{
      id: 123,
      name: 'test',
      weather: [{icon: 'test', main: 'test', id: 123, description: 'test'}],
      main: {temp: 10, humidity: 10, pressure: 10},
      wind: {speed: 10},
      dt: 10,
      coord: {lat: 10, lon: 10}
    }]
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherComponent, MockComponents(WeatherFilterBarComponent, WeatherWidgetComponent, WeatherForecastComponent)],
      providers: [
        {
          provide: LoaderService,
          useValue: {
            hideLoader: () => {
            },
            showLoader: () => {
            }
          }
        },
        {
          provide: WeatherService,
          useValue: {
            getWeatherSummary: () => of(weatherSummary),
            getForecast: () => of({hourly: []}),
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather summary after onSearch callback', () => {
    const spy = spyOn(component['weatherService'], 'getWeatherSummary').and.callThrough();
    expect(component.weatherList.length).toEqual(0);

    component.onSearch('123');

    expect(spy).toHaveBeenCalled();
    expect(component.weatherList.length).toEqual(1);
  });

  it('should load forecasst after onSelectedWeather callback', () => {
    const spy = spyOn(component['weatherService'], 'getForecast').and.callThrough();
    expect(component.forecast).toBeFalsy();

    component.onSelectedWeather({} as Weather, 0);

    expect(spy).toHaveBeenCalled();
    expect(component.forecast).toBeTruthy();
  })
});
