import {ComponentFixture, fakeAsync, TestBed, waitForAsync} from '@angular/core/testing';

import {WeatherFilterBarComponent} from './weather-filter-bar.component';
import {MockComponents, MockDirectives, MockPipes} from 'ng-mocks';
import {MatFormField} from '@angular/material/form-field';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {WeatherCitiesStore} from '../../services/weather/weather-cities.store';
import {of} from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {City} from '../../model/interfaces/weather/city.model';
import { WeatherApiKeyStore } from 'src/app/services/weather/weather-api-key.store';

describe('WeatherFilterBarComponent', () => {
  let component: WeatherFilterBarComponent;
  let fixture: ComponentFixture<WeatherFilterBarComponent>;

  const cities: City[] = [
    {
      "id": 2643743,
      "name": "London",
      "state": "",
      "country": "GB",
      "coord": {
        "lon": -0.12574,
        "lat": 51.50853
      }
    },
    {
      "id": 5128638,
      "name": "New York",
      "state": "NY",
      "country": "US",
      "coord": {
        "lon": -75.499901,
        "lat": 43.000351
      }
    },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        WeatherFilterBarComponent,
        MockComponents(MatFormField, MatSelect, MatOption, MatButton),
        MockDirectives(MatInput),
        MockPipes(TranslatePipe),
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: WeatherCitiesStore,
          useValue: {
            cities: of(cities)
          }
        },
        {
          provide: WeatherApiKeyStore,
          useValue: {
            updateApiKeyManually: () => {}
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('cities')?.value).toEqual(null);
  });

  it('should load cities', () => {
    expect(component.availableCities.length).toEqual(2);
  });

  it('should get form control', () => {
    expect(component.cities).toEqual(component.form.get('cities'));
  });

  it('should update date after search clicked', () => {
    component.cities?.setValue([cities[0].id]);

    fixture.nativeElement.querySelector('button').click();

    expect(component.currentDate).toBeTruthy();
  });

  it('should be button disabled on init', () => {
    expect(component.isNotEmpty).toBeFalsy();
  });

  it('should emit output data after search clicked', () => {
    component.cities?.setValue([cities[0].id]);
    const spy = spyOn(component.search, 'emit').and.callFake(() => {
    });
    fixture.nativeElement.querySelector('button').click();

    expect(spy).toHaveBeenCalledWith(cities[0].id.toString());
  });

  it('should not remove value from selection - less than 5 elements selected', fakeAsync(() => {
    const spy = spyOn(component.cities, 'patchValue' as never).and.callThrough();

    component.cities?.setValue([cities[0].id]);
    component.selectionChanged({value: [cities[0].id]} as MatSelectChange);

    expect(component.cities?.value.length).toEqual(1);
    expect(spy).not.toHaveBeenCalled();
  }));

  it('should remove value from selection - more than 5 elements selected', fakeAsync(() => {
    const spy = spyOn(component.cities, 'patchValue' as never).and.callThrough();

    const model = [cities[0].id, cities[0].id, cities[0].id, cities[0].id, cities[0].id, cities[0].id];
    component.cities?.setValue(model);
    component.selectionChanged({value: model} as MatSelectChange);

    expect(component.cities?.value.length).toEqual(5);
    expect(spy).toHaveBeenCalled();
  }));

  it('should trigger manually update for API key', () => {
    const spy = spyOn(component['weatherApiKeyStore'], 'updateApiKeyManually').and.callThrough();

    component.updateApiKey();

    expect(spy).toHaveBeenCalled();
  })
});
