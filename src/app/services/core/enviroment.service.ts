import {Inject, Injectable, Optional} from "@angular/core";
import {ENVIRONMENT} from "src/app/injection-tokens/environment.token";
import {Environment} from "src/app/model/interfaces/core/environment.interface";

/**
 * Wrapper for Environment Service
 */
@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly environment: Environment | null;

  constructor(@Optional() @Inject(ENVIRONMENT) environment?: Environment) {
    if (!environment) {
      throw new Error('[EnvironmentService] no environment found!')
    }
    this.environment = environment;
  }

  getEnvironment(): Environment | null {
    return this.environment;
  }
}
