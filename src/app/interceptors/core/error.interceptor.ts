import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Interceptor show error message as a snackbar when backend returned error code
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly WHITE_LIST = ['health-check'];

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(error => this.handleError(error, req.params))
      );
  }

  /**
   * If url doesn't contain header, which is on whitelist, then application should display snackbar with error
   * @param error - http error
   * @param params - http params which includes whitelist headers
   * @private
   */
  private handleError(error: HttpErrorResponse, params: HttpParams): Observable<any> {
    const paramsConverted: string = params.toString();
    if (this.WHITE_LIST.some((element: string) => paramsConverted.includes(element))) {
      return throwError(() => error);
    }

    this.snackBar.open(error.error.message);
    return throwError(() => error);
  }
}
