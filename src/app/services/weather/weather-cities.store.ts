import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, Observable, Subject, take} from 'rxjs';
import {City} from '../../model/interfaces/weather/city.model';

/**
 * Storage service for Cities
 * OpenWeather shares cities as a simple json file (which is massive)
 * I decided to cache a few cities in JSON file in local assets
 */
@Injectable()
export class WeatherCitiesStore {
  private availableCities: Subject<Array<City>> = new Subject();

  constructor(private readonly http: HttpClient) {
    this.http.get('./assets/cities.json')
      .pipe(filter(Boolean), take(1))
      .subscribe(cities => this.availableCities.next(cities as Array<City>));
  }

  /**
   * Simple getter for cities
   */
  get cities(): Observable<Array<City>> {
    return this.availableCities;
  }
}
