export interface OpenWeatherSummaryList {
  list: Array<OpenWeatherSummary>;
}

export interface OpenWeatherSummary {
  id: number;
  name: string;
  weather: Array<OpenWeatherSummaryWeather>;
  main: OpenWeatherSummaryMain;
  wind: OpenWeatherSummaryWind;
  coord: OpenWeatherSummaryCoords;
  dt: number;
}

export interface OpenWeatherSummaryWeather {
  id: number;
  main: string;
  description: string;
  icon: string
}

export interface OpenWeatherSummaryMain {
  temp: number;
  humidity: number;
  pressure: number;
}

export interface OpenWeatherSummaryWind {
  speed: number;
}

export interface OpenWeatherSummaryCoords {
  lat: number;
  lon: number;
}
