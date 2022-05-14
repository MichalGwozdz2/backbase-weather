import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WeatherService} from '../../services/weather/weather.service';

/**
 * Modal component, should be displayed on the start of application if you didn't specify Api Key in environment file
 */
@Component({
  selector: 'app-weather-api-key',
  templateUrl: './weather-api-key.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherApiKeyComponent implements OnInit {
  form!: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly weatherService: WeatherService,
              private readonly cd: ChangeDetectorRef,
              @Optional() @Inject(MAT_DIALOG_DATA) public mode: string,
              private readonly ref: MatDialogRef<WeatherApiKeyComponent>) {
  }

  /**
   * Init the form
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      apiKey: ['', Validators.required]
    });
  }

  /**
   * Triggers health check for passed Api Key
   */
  addKey(): void {
    const key: string = this.form.get('apiKey')?.value;

    if (!key) {
      return;
    }

    this.weatherService.apiKeyCheck(key).subscribe(
      () => this.ref.close(key),
      () => this.handleError()
    );
  }

  /**
   * Shortcut getter for apiKey control
   */
  get apiKey(): AbstractControl {
    return this.form.controls['apiKey'];
  }

  /**
   * If input is empty this error should be attached
   */
  get isEmpty(): boolean {
    return this.apiKey.hasError('required');
  }

  /**
   * If backend returns 401 error then error should be attached
   */
  get isInvalid(): boolean {
    return this.apiKey.hasError('apiNotValid');
  }

  get isNew(): boolean {
    return this.mode === 'new';
  }

  /**
   * Attach validation error to form (should be added when backend returned 401 code in health check)
   * @private
   */
  private handleError(): void {
    this.form.get('apiKey')?.setErrors({'apiNotValid': 'Api Key is not proper!'});
    this.cd.detectChanges();
  }
}
