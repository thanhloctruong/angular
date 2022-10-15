import { InjectionToken } from '@angular/core';
import { LogConfig } from '../interfaces/logging';
export const LOG_CONFIG: InjectionToken<LogConfig> = new InjectionToken("Logging Service Configuration");
