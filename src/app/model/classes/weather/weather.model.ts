import {OpenWeatherSummary} from '../../interfaces/weather/open-weather.model';

export class Weather {
  readonly hour!: Date;

  constructor(
    readonly id: number,
    readonly name: string,
    readonly icon: string,
    readonly description: string,
    readonly temp: number,
    readonly windSpeed: number,
    readonly humidity: number,
    readonly pressure: number,
    dt: number,
    readonly lat: number,
    readonly lon: number) {
    const second: number = 1000;
    this.hour = new Date(second * dt);
  }

  static fromOpenWeather(object: OpenWeatherSummary): Weather {
    return new Weather(
      object.id,
      object.name,
      object.weather[0].icon,
      object.weather[0].main,
      object.main.temp,
      object.wind.speed,
      object.main.humidity,
      object.main.pressure,
      object.dt,
      object.coord.lat,
      object.coord.lon
    )
  }
}
