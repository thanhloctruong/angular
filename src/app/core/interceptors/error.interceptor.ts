import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        console.log('ERROR TOKEN INTERCEPTOR');
        if (typeof error === 'string') {
          return throwError(() => error);
        }
        let errorMessage = '';
        if (error.status === 0) {
          errorMessage = error.statusText;
        } else if (error.error instanceof Object) {
          errorMessage = error.error.message;
        } else if (error.messages && error.messages.length > 0) {
          errorMessage = error.messages.join('\n');
        } else if (error.message) {
          errorMessage = `${error.message}`;
        } else {
          errorMessage = `${error.status}: ${error.statusText}`;
        }
        return throwError(() => errorMessage);
      })
    );
  }
}
