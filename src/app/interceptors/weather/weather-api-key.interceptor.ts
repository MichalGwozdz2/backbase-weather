import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WeatherApiKeyStore} from 'src/app/services/weather/weather-api-key.store';

/**
 * Interceptor attach appid header for every endpoint (except endpoints in whitelist)
 */
@Injectable()
export class WeatherApiKeyInterceptor implements HttpInterceptor {
  private readonly WHITE_LIST = ['health-check'];
  private readonly API_ID_PARAM = 'appid';
  private readonly OPEN_API_WEATHER_MAP = 'openweathermap';

  constructor(private readonly weatherApiKeyStore: WeatherApiKeyStore) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addApiKey(req));
  }

  /**
   * If url doesn't contain header, which is on whitelist, then application should attach appid header
   * @param req - current request
   * @private
   */
  private addApiKey(req: HttpRequest<any>): HttpRequest<any> {
    const paramsConverted: string = req.params.toString();
    if (this.WHITE_LIST.some((element: string) => paramsConverted.includes(element))) {
      return req;
    }

    if (req?.url?.includes(this.OPEN_API_WEATHER_MAP)) {
      return req.clone({
        params: req.params.set(this.API_ID_PARAM, this.weatherApiKeyStore.getApiKey())
      })
    }
    return req;
  }
}
