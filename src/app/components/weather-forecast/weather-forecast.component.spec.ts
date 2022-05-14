import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {WeatherForecastComponent} from './weather-forecast.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MockComponents, MockDirectives, MockPipes} from 'ng-mocks';
import {MatChip, MatChipList} from '@angular/material/chips';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherForecastComponent, MockComponents(MatChipList), MockDirectives(MatChip), MockPipes(TranslatePipe)],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    component.forecast = {hourly: []};
    (component as any).chartConfigFn = () => ({data: {datasets: [{data: {}}]}, update: () => {}});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should init chart config', () => {
    expect(component.lineChart).toBeTruthy();
  });

  it('should change selection', () => {
    const chipMock = {
      select: () => {
      }
    }
    const spy = spyOn(chipMock, 'select').and.callThrough();

    component.onSelect(chipMock as MatChip);

    expect(spy).toHaveBeenCalled();
  });
});
