import { JwtConfig } from './../interfaces/jwt';
import { InjectionToken } from '@angular/core';
export const JWT_CONFIG: InjectionToken<JwtConfig> = new InjectionToken("JWT Config Configuration");
