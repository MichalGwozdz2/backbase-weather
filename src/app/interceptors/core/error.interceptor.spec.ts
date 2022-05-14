import {TestBed, waitForAsync} from '@angular/core/testing';

import {ErrorInterceptor} from './error.interceptor';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HTTP_INTERCEPTORS, HttpParams} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, of, take} from 'rxjs';

describe('ErrorInterceptor', () => {
  let service: ErrorInterceptor;
  let client: HttpClient;
  let controller: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
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
    service = TestBed.inject(ErrorInterceptor);
  })

  it('should create', () => {
    expect(client).toBeTruthy();
    expect(controller).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('should not call for snackbar', (done) => {
    const spy = spyOn(service['snackBar'], 'open').and.callThrough();

    client.get('/test')
      .pipe(
        take(1),
        catchError(() => of(true))
      ).subscribe(() => done());

    controller.expectOne('/test').flush({});

    expect(spy).not.toHaveBeenCalled();
  });

  it('should call for snackbar', (done) => {
    const spy = spyOn(service['snackBar'], 'open').and.callThrough();

    client.get('/test2')
      .pipe(
        take(1),
        catchError(() => of(true))
      ).subscribe(() => done());

    controller.expectOne('/test2').error(new ProgressEvent('asd'))

    expect(spy).toHaveBeenCalled();
  });

  it('should not call for snackbar because of whitelist', (done) => {
    const spy = spyOn(service['snackBar'], 'open').and.callThrough();

    client.get('/test', {params: new HttpParams().set('health-check', true)})
      .pipe(
        take(1),
        catchError(() => of(true))
      ).subscribe(() => done());

    controller.expectOne('/test?health-check=true').error(new ProgressEvent('asd'));

    expect(spy).not.toHaveBeenCalled();
  });
});
