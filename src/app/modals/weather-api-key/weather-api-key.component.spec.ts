import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WeatherApiKeyComponent} from './weather-api-key.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MockComponents, MockDirectives, MockPipes} from 'ng-mocks';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {WeatherService} from '../../services/weather/weather.service';
import {of, throwError} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {OpenWeatherSummaryList} from '../../model/interfaces/weather/open-weather.model';

describe('WeatherApiKeyComponent', () => {
  let component: WeatherApiKeyComponent;
  let fixture: ComponentFixture<WeatherApiKeyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherApiKeyComponent, MockComponents(MatFormField, MatButton), MockDirectives(MatError, MatInput), MockPipes(TranslatePipe)],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {
            }
          }
        },
        {
          provide: WeatherService,
          useValue: {
            apiKeyCheck: () => of(true)
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    expect(component.form).toBeTruthy();
    expect(component.apiKey).toBeTruthy();
  });

  it('should input be empty and valid', () => {
    expect(component.isEmpty).toBeTruthy();
    expect(component.isInvalid).toBeFalsy();
  });

  it('should input be not empty and valid', () => {
    component.apiKey.setValue('test');
    component.apiKey.updateValueAndValidity();

    expect(component.isEmpty).toBeFalsy();
    expect(component.isInvalid).toBeFalsy();
  });

  it('should throw validation error', () => {
    const stream = throwError(new Error('Fake error'));
    const spy = spyOn(component['weatherService'], 'apiKeyCheck').and.callFake(() => stream);
    const spy2 = spyOn(component as any, 'handleError').and.callThrough();

    component.apiKey.setValue('test');
    component.apiKey.updateValueAndValidity();
    component.addKey();

    expect(component.isEmpty).toBeFalsy();
    expect(component.isInvalid).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('should add new key', () => {
    const stream = of({} as OpenWeatherSummaryList);
    const spy = spyOn(component['weatherService'], 'apiKeyCheck').and.callFake(() => stream);
    const spy2 = spyOn(component as any, 'handleError').and.callThrough();

    component.apiKey.setValue('test');
    component.apiKey.updateValueAndValidity();
    component.addKey();

    expect(component.isEmpty).toBeFalsy();
    expect(component.isInvalid).toBeFalsy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });

});
