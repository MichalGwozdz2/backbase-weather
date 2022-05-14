import {InjectionToken} from "@angular/core";
import {Environment} from "../model/interfaces/core/environment.interface";

export const ENVIRONMENT = new InjectionToken<Environment>('environment-injection-token');
