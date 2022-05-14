import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Weather} from '../../model/classes/weather/weather.model';
import {WeatherService} from '../../services/weather/weather.service';

/**
 * The component displays info about current weather for concrete city
 */
@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherWidgetComponent {
  @Input()
  selected!: boolean;

  link!: string;
  currentWeather!: Weather;

  constructor(private readonly weatherService: WeatherService) {
  }

  /**
   * Assign model and update link to image
   * @param weather - main model
   */
  @Input()
  set weather(weather: Weather) {
    if (!weather) {
      return;
    }

    this.currentWeather = weather;
    this.link = `${this.weatherService.weatherImgUrl()}/${weather.icon}.png`;
  }
}
