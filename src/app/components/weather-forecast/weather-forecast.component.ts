import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {WeatherForecast, WeatherForecastHourly} from '../../model/classes/weather/weather-forecast.model';
import {Chart} from 'chart.js';
import {chartConfig} from '../../consts/chart-config.const';
import {ForecastTypeEnum} from '../../enums/forecast-type.enum';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatChip} from '@angular/material/chips';

/**
 * The Component displays canvas with forecast for next 12 hour
 * for concrete city, there are chip buttons which allows to change criteria for chart
 * (can visualise data by temperature, pressure, humidity and clouds)
 */
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastComponent implements OnInit, AfterViewInit {
  /**
   * Name of city, displayed on top of widget
   */
  @Input()
  name!: string;

  /**
   * Forecast model for next 12 hour
   */
  @Input()
  forecast!: WeatherForecast;

  @ViewChild('lineCanvas')
  readonly lineCanvas!: ElementRef;

  lineChart!: Chart;
  form!: FormGroup;
  readonly forecastTypes: typeof ForecastTypeEnum = ForecastTypeEnum;

  private readonly chartConfigFn = chartConfig;

  constructor(private readonly fb: FormBuilder, private readonly cd: ChangeDetectorRef) {
  }

  /**
   * Init model
   */
  ngOnInit(): void {
    this.form = this.fb.group({ type: [this.forecastTypes.TEMP] });
    this.cd.detectChanges();
  }

  /**
   * Retrieves config object for chart
   */
  ngAfterViewInit(): void {
    this.lineChart = this.chartConfigFn(this.lineCanvas.nativeElement, this.forecast.hourly);
  }

  /**
   * Updates data for chart model
   * @param control - MatChip component, used for trigger select action
   */
  onSelect(control: MatChip): void {
    this.lineChart.data.datasets[0].data = this.forecast.hourly
      .map((element: WeatherForecastHourly) => element[control.value])
    this.lineChart.update();
    control.select();
  }
}
