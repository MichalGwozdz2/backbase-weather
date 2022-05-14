import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Weather} from 'src/app/model/classes/weather/weather.model';
import {WeatherService} from 'src/app/services/weather/weather.service';
import {OpenWeatherSummary, OpenWeatherSummaryList} from '../../model/interfaces/weather/open-weather.model';
import {OpenWeatherForecast} from '../../model/interfaces/weather/open-weather-forecast.model';
import {WeatherForecast} from '../../model/classes/weather/weather-forecast.model';
import {LoaderService} from '../../services/core/loader.service';

/**
 * Components is a wrapper for the main functionality.
 * The main responsibility is downloading data form backend and.
 */
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  weatherList: Array<Weather> = [];
  forecast!: WeatherForecast | null;
  selectedIndex!: number | null;
  forecastName!: string;

  constructor(private readonly weatherService: WeatherService,
              private readonly cd: ChangeDetectorRef,
              private readonly loader: LoaderService) {
  }

  /**
   * Callback for clicking search button in WeatherFilterBat, calls the backend for list of weather summary for max 5 cities
   * @param citiesIds - ids of cities we want to show as a widgets, separated by comma
   */
  onSearch(citiesIds: string): void {
    this.forecast = null;
    this.forecastName = '';
    this.selectedIndex = null;
    this.loader.showLoader();
    this.cd.detectChanges();

    this.weatherService.getWeatherSummary(citiesIds).subscribe((result: OpenWeatherSummaryList) => {
      this.weatherList = result.list.map((element: OpenWeatherSummary) => Weather.fromOpenWeather(element));
      this.loader.hideLoader();
      this.cd.detectChanges();
    }, () => this.loader.hideLoader());
  }

  /**
   * Callback for clicking on widget in WidgetComponent, calls the backend for forecast for one city
   * @param weather - needed to get latitude and longitude
   * @param index - index for current selection (used for highlight widget)
   */
  onSelectedWeather(weather: Weather, index: number): void {
    this.selectedIndex = index;
    this.forecastName = weather.name;
    this.forecast = null;
    this.loader.showLoader();
    this.cd.detectChanges();

    this.weatherService.getForecast(weather.lat, weather.lon).subscribe((result: OpenWeatherForecast) => {
      this.forecast = WeatherForecast.fromOpenWeather(result);
      this.loader.hideLoader();
      this.cd.detectChanges();
    }, () => this.loader.hideLoader());
  }
}
