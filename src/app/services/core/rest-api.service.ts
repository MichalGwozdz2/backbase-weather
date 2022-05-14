import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ResourceEnum} from 'src/app/enums/resource.enum';
import {EnvironmentService} from './enviroment.service';

/**
 * Wrapper on HttpClient, I can add extra middleware functionality very easily now.
 * Using http is easier as well because I wrapped core URL into enums, and there is no need to use simple strings
 */
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
  }

  /**
   * Wrapper on GET call
   * @param resource - core URL indicator
   * @param url - end of URL
   * @param params - HttpParams
   */
  get(resource: ResourceEnum, url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(this.getUrl(resource, url), { params });
  }

  /**
   * Retrieves core URL from environment
   * @param resource - core URL indicator
   * @param url - end of URL
   */
  getUrl(resource: ResourceEnum, url: string): string {
    const envApi = this.environmentService.getEnvironment()?.restApi;

    if (!envApi || (envApi && !envApi[resource])) {
      throw new Error('[RestApiService] no api found in env!')
    }

    return `${envApi[resource]}/${url}`;
  }
}
