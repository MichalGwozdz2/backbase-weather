import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WeatherCitiesStore} from '../../services/weather/weather-cities.store';
import {MatSelectChange} from '@angular/material/select';
import {City} from '../../model/interfaces/weather/city.model';
import {filter, take} from 'rxjs';
import {WeatherApiKeyStore} from '../../services/weather/weather-api-key.store';

/**
 * The component displays select component with available cities,
 * button for triggering search process, last search date
 * and a button for updating API key.
 */
@Component({
  selector: 'app-weather-api-bar',
  templateUrl: './weather-filter-bar.component.html',
  styleUrls: ['./weather-filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherFilterBarComponent implements OnInit {
  @Output()
  readonly search: EventEmitter<string> = new EventEmitter<string>();

  form!: FormGroup;
  availableCities!: City[];
  currentDate!: Date;
  showView!: boolean;

  constructor(private readonly citiesStore: WeatherCitiesStore,
              private readonly weatherApiKeyStore: WeatherApiKeyStore,
              private readonly cd: ChangeDetectorRef,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.citiesStore.cities.pipe(filter(Boolean), take(1)).subscribe((cities: City[]) => this.initView(cities));
  }

  /**
   * Shortcut for cities in form model
   */
  get cities() {
    return this.form.get('cities');
  }

  /**
   * Returns true if there are selected cities in form
   */
  get isNotEmpty(): boolean {
    return !!this.cities?.value?.length;
  }

  /**
   * If model is not empty, then application will emit search event and update search date
   */
  emitSearch(): void {
    if (!this.isNotEmpty) {
      return;
    }
    this.currentDate = new Date();
    this.search.emit(this.cities?.value.toString());
  }

  /**
   * Displays WeatherApiKeyComponent as modal, where api key can be updated
   */
  updateApiKey(): void {
    this.weatherApiKeyStore.updateApiKeyManually();
  }

  /**
   * Deselect last value if there are more than 5 elements in model
   * @param value - selected elements in select component
   */
  selectionChanged({value}: MatSelectChange): void {
    if (value.length > 5) {
      this.cities?.patchValue(value.slice(0, 5));
    }
  }

  private initView(cities: City[]): void {
    this.form = this.fb.group({cities: []});
    this.availableCities = cities;
    this.showView = true;
    this.cd.detectChanges();
  }
}
