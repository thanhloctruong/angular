import { JwtConfig } from './jwt';
import { LogConfig } from './logging';
import { ApiConfig } from "./api";
import { InterceptorConfig } from './interceptor';

export interface CoreModuleConfig {
  apiConfig: ApiConfig,
  jwtConfig: JwtConfig,
  logConfig: LogConfig,
  interceptorConfig: InterceptorConfig
}
