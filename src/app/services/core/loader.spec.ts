import {TestBed, waitForAsync} from '@angular/core/testing';

import {LoaderService} from './loader.service';
import {MockComponents} from 'ng-mocks';
import {LoaderComponent} from '../../modals/loader/loader.component';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponents(LoaderComponent)],
      providers: [
        LoaderService,
        {
          provide: MatDialog,
          useValue: {
            open: () => ({
              afterClosed: () => of(true),
              close: () => {}
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(LoaderService);
  })

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should isVisible be falsy on init', () => {
    expect(service.isVisible).toBeFalsy()
  });

  it('should open loader', () => {
    expect(service['loaderRef']).toBeFalsy();

    service.showLoader();

    expect(service.isVisible).toBeTruthy();
    expect(service['loaderRef']).toBeTruthy();
  });

  it('should close loader', () => {
    expect(service['loaderRef']).toBeFalsy();

    service.showLoader();

    expect(service.isVisible).toBeTruthy();
    expect(service['loaderRef']).toBeTruthy();

    service.hideLoader();

    expect(service.isVisible).toBeFalsy();
    expect(service['loaderRef']).toBeFalsy();
  });
});
