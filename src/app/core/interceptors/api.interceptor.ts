import { API_CONFIG } from './../tokens/api';
import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApiInterceptorConfig,
  InterceptorConfig,
} from '../interfaces/interceptor';
import { ApiConfig } from '../interfaces/api';
import { INTERCEPTOR_CONFIG } from '../tokens/interceptor';

const DEFAULT_CONFIG: ApiInterceptorConfig = {
  enable: true,
};

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  config: ApiInterceptorConfig;
  constructor(
    @Inject(API_CONFIG) private apiConfig: ApiConfig,
    @Inject(INTERCEPTOR_CONFIG) private interceptorConfig: InterceptorConfig
  ) {
    this.config = { ...DEFAULT_CONFIG, ...interceptorConfig };
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('API INTERCEPTOR');
    if (this.config.enable) {
      request = request.clone({
        url: this.apiConfig.host + request.url,
      });
    }

    console.log(request);

    return next.handle(request);
  }
}
