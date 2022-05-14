import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WeatherWidgetComponent} from './weather-widget.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MockPipes} from 'ng-mocks';
import {Weather} from '../../model/classes/weather/weather.model';
import {WeatherService} from '../../services/weather/weather.service';

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherWidgetComponent, MockPipes(TranslatePipe)],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            weatherImgUrl: () => ''
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    component.weather = {} as Weather;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update link', () => {
    const weather: Weather = {icon: 'test'} as Weather;
    expect(component.link).not.toContain('test');


    component.weather = weather;

    expect(component.currentWeather).toEqual(weather);
    expect(component.link).toContain('test');
  })
});
