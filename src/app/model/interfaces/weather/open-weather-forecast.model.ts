export interface OpenWeatherForecast {
  hourly: OpenWeatherForecastHourly[];
}

export interface OpenWeatherForecastHourly {
  temp: number;
  dt: number;
  wind_speed: number;
  pressure: number;
  humidity: number;
  clouds: number;
}
