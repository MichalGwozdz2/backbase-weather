export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: CityCoord;
}

export interface CityCoord {
  lon: number;
  lat: number;
}
