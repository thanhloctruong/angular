import {
  InterceptorConfig,
  RefreshTokenInterceptorConfig,
} from './../interfaces/interceptor';
import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  catchError,
  filter,
  map,
  Observable,
  switchMap,
  take,
  throwError,
  Subject,
} from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { INTERCEPTOR_CONFIG } from '../tokens/interceptor';

const DEFAULT_CONFIG: RefreshTokenInterceptorConfig = {
  enable: true,
  retry: 0,
};

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;
  refreshTokenSubject: Subject<any> = new Subject();
  config: RefreshTokenInterceptorConfig;
  constructor(
    @Inject(INTERCEPTOR_CONFIG) private interceptorConfig: InterceptorConfig,
    private _jwt: JwtService
  ) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...interceptorConfig.refreshTokenInterceptor,
    };
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.log('REFRESH TOKEN INTERCEPTOR');
        if (this.config.enable) {
          if ([401].indexOf(error.status) > -1) {
            if (this._jwt.refreshToken) {
              if (!this.isRefreshing) {
                new Observable<any>((observer) => {
                  setTimeout(() => {
                    observer.next();
                    observer.complete();
                  }, 5000);
                }).pipe(
                  switchMap(() => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(true);
                    return next.handle(
                      request.clone({
                        headers: request.headers.set(
                          'Authorization',
                          this._jwt.accessTokenWithPrefix
                        ),
                      })
                    );
                  })
                );
              }
              return this.refreshTokenSubject.pipe(
                filter((val) => val),
                take(1),
                switchMap(() => {
                  return next.handle(
                    request.clone({
                      headers: request.headers.set(
                        'Authorization',
                        this._jwt.accessTokenWithPrefix
                      ),
                    })
                  );
                })
              );
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
