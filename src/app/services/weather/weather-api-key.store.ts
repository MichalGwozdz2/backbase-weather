import {Injectable} from '@angular/core';
import {EnvironmentService} from '../core/enviroment.service';
import {MatDialog} from '@angular/material/dialog';
import {WeatherApiKeyComponent} from '../../modals/weather-api-key/weather-api-key.component';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Storage service for Api Key.
 * Service has additional functionality - it shows WeatherApiKeyComponent as a modal,
 * in scenario where api key is not assigned in environment file.
 */
@Injectable()
export class WeatherApiKeyStore {
  private appid!: string;

  constructor(private readonly environmentService: EnvironmentService,
              private readonly snackBar: MatSnackBar,
              private readonly dialog: MatDialog) {
    this.assignAppIdFromEnv();
  }

  /**
   * Simple setter for api key
   * @param appId
   */
  assignApiKey(appId: string): void {
    if (!appId) {
      return;
    }

    this.appid = appId;
  }

  /**
   * Simple getter for api key
   */
  getApiKey(): string {
    return this.appid;
  }

  /**
   * Displays WeatherApiKeyComponent as a modal, there can be updated API Key
   */
  updateApiKeyManually(): void {
    this.dialog
      .open(WeatherApiKeyComponent, { data: 'update' })
      .afterClosed()
      .subscribe((id: string) => {
        if (id) {
          this.assignApiKey(id);
          this.snackBar.open('Api Key added successfully!')
        }
      });
  }

  /**
   * if environment file doesn't contain api key, then function shows WeatherApiKeyComponent and update value
   * @private
   */
  private assignAppIdFromEnv(): void {
    console.log(this.environmentService.getEnvironment())
    const appId = this.environmentService.getEnvironment()?.apiKeys.openWeatherApiKey;

    if (!appId) {
      this.dialog
        .open(WeatherApiKeyComponent, {disableClose: true, data: 'new'})
        .afterClosed()
        .subscribe((id: string) => {
          this.assignApiKey(id);
          this.snackBar.open('Api Key added successfully!')
        });
      return;
    }

    this.assignApiKey(appId);
  }
}
