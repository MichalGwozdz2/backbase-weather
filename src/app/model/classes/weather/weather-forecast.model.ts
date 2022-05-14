import {OpenWeatherForecast, OpenWeatherForecastHourly} from '../../interfaces/weather/open-weather-forecast.model';

const remapForecast = (object: OpenWeatherForecast): WeatherForecastHourly[] => {
   const forecast: WeatherForecastHourly[] = object
    .hourly
    .map((element: OpenWeatherForecastHourly) => ({
      temp: element.temp,
      hour: new Date(1000 * element.dt).getHours(),
      windSpeed: element.wind_speed,
      pressure: element.pressure,
      humidity: element.humidity,
      clouds: element.clouds
    }));
  forecast.length = 12;

  return forecast;
}

export class WeatherForecast {
  constructor(
    readonly hourly: WeatherForecastHourly[]) {
  }

  static fromOpenWeather(object: OpenWeatherForecast): WeatherForecast {
    return new WeatherForecast(remapForecast(object))
  }
}

export interface WeatherForecastHourly {
  temp: number;
  hour: number
  windSpeed: number;
  pressure: number;
  humidity: number;
  clouds: number;
}
