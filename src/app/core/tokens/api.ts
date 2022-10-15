import { InjectionToken } from "@angular/core";
import { ApiConfig } from "../interfaces/api";

export const API_CONFIG: InjectionToken<ApiConfig> = new InjectionToken("API Configuration");
