import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INTERCEPTOR_CONFIG } from '../tokens/interceptor';
import { AuthInterceptorConfig, InterceptorConfig } from '../interfaces/interceptor';
import { LoggingService } from '../services/logging.service';
import { JwtService } from '../services/jwt.service';

const DEFAULT_CONFIG: AuthInterceptorConfig = {
  enable: true,
  excludeUrls: [],
};

/**
 * Add JWT Token for Request
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  config: AuthInterceptorConfig;
  constructor(@Inject(INTERCEPTOR_CONFIG) private interceptorConfig: InterceptorConfig, private _log: LoggingService, private _jwt: JwtService) {
    this.config = { ...DEFAULT_CONFIG, ...this.interceptorConfig.authInterceptor };
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('AUTH INTERCEPTOR');
    this._log.info('Auth Interceptor', this.config);

    if (this.config.enable) {
      if (this._jwt.accessToken && this.config.excludeUrls.filter((url) => request.url.includes(url)).length == 0) {
        request = request.clone({ headers: request.headers.set('Authorization', this._jwt.accessTokenWithPrefix) });
      }
    }
    return next.handle(request);
  }
}
