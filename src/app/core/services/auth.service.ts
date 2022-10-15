import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_ENDPOINT } from '../enums/auth';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _api: ApiService) {}
  login(data: any): Observable<any> {
    return this._api.post<any>(AUTH_ENDPOINT.LOGIN, data);
  }
}
