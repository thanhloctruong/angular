import { API_CONFIG } from '../tokens/api';
import { Inject, Injectable } from '@angular/core';
import { ApiConfig } from '../interfaces/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UrlUtils } from 'src/app/utils';

enum CONTENT_TYPE {
  JSON = 'application/json; charset=UTF-8',
  TEXT = 'text/plain; charset=UTF-8',
  HTML = 'text/html; charset=UTF-8',
  FORM_DATA = 'multipart/form-data',
  FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    @Inject(API_CONFIG) private apiConfig: ApiConfig,
    private _http: HttpClient
  ) {}

  /**
   * Call api by GET method.
   * @param {string} endpoint API endpoint
   * @param {any} [data={}] Api params
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  get<T>(endpoint: string, data: any = {}): Observable<T> {
    return this._http.get(
      UrlUtils.merge(
        this.apiConfig.prefix,
        this.apiConfig.version,
        endpoint,
        data
      )
    ) as Observable<T>;
  }

  /**
   * Call api by POST method.
   * @param {string} endpoint API endpoint
   * @param {any} [data={}] Request data
   * @param {*} options Method options
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  post<T>(endpoint: string, data: any = {}, options: any = {}): Observable<T> {
    let httpOptions: any;
    let httpHeaders = {
      'Content-Type': CONTENT_TYPE.JSON,
    };

    httpHeaders = { ...httpHeaders, ...options.headers };

    httpOptions = {
      headers: new HttpHeaders(httpHeaders),
    };

    if (options.headers?.['Content-Type'] == CONTENT_TYPE.FORM_URLENCODED) {
      data = Object.keys(data)
        .map((key) => `${key}=${encodeURIComponent(data[key])}`)
        .join('&');
    }

    return this._http.post(
      UrlUtils.merge(this.apiConfig.prefix, this.apiConfig.version, endpoint),
      data,
      httpOptions
    ) as Observable<any>;
  }

  /**
   * Call api by PUT method.
   * @param {string} endpoint API endpoint
   * @param {any} [data={}] Request data
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  put(endpoint: string, data: any = {}): Observable<any> {
    return this._http.put(
      UrlUtils.merge(this.apiConfig.prefix, this.apiConfig.version, endpoint),
      data
    );
  }

  /**
   * Call api by PATCH method.
   * @param {string} endpoint API endpoint
   * @param {any} [data={}] Request data
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  patch(endpoint: string, data: any = {}): Observable<any> {
    return this._http.patch(
      UrlUtils.merge(this.apiConfig.prefix, this.apiConfig.version, endpoint),
      data
    );
  }

  /**
   * Call api by DELETE method.
   * @param {string} endpoint API endpoint
   * @param {any} [data={}] Request params
   * @returns {Observable<any>}
   * @memberof ApiService
   */
  delete(endpoint: string, data: any = {}): Observable<any> {
    return this._http.delete(
      UrlUtils.merge(
        this.apiConfig.prefix,
        this.apiConfig.version,
        endpoint,
        data
      )
    );
  }
}
