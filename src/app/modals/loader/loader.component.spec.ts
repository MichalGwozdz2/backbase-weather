import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoaderComponent} from './loader.component';
import {MockComponents} from 'ng-mocks';
import {MatSpinner} from '@angular/material/progress-spinner';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent, MockComponents(MatSpinner)]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
