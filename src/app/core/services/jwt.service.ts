import { JwtAccessToken, JwtConfig } from './../interfaces/jwt';
import { JWT_CONFIG } from './../tokens/jwt';
import { Inject, Injectable } from '@angular/core';
import { JWT_STORE } from '../enums/jwt';
import { CookieUtils } from 'src/app/utils/cookie';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  /** Update Soon */
  // get isStoreCookie(): boolean {
  //   return this.jwtConfig.storeAt == JWT_STORE.COOKIE;
  // }

  constructor(@Inject(JWT_CONFIG) private jwtConfig: JwtConfig) {}

  setJwtData(data: JwtAccessToken): void {
    this.saveAccessToken(data.accessToken);
    if (this.jwtConfig.refreshTokenKey && data.refreshToken) {
      this.saveRefreshToken(data.refreshToken);
    }
  }

  get accessTokenWithPrefix(): string {
    return `${this.jwtConfig.prefix} ${this.accessToken}`;
  }

  get refreshToken(): string {
    if (!this.jwtConfig.refreshTokenKey) {
      return '';
    }
    return CookieUtils.Get(this.jwtConfig.refreshTokenKey);
  }

  get accessToken(): string {
    return CookieUtils.Get(this.jwtConfig.accessTokenKey);
  }

  saveAccessToken(token: string, expire?: number | string | null) {
    const expireDate = !expire
      ? null
      : typeof expire === 'string'
      ? new Date(expire)
      : new Date(expire * 1000);
    CookieUtils.Set(this.jwtConfig.accessTokenKey, token, expireDate);
  }

  saveRefreshToken(refreshToken: string) {
    if (this.jwtConfig.refreshTokenKey) {
      CookieUtils.Set(this.jwtConfig.refreshTokenKey, refreshToken);
    }
  }

  clearAll(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  removeAccessToken(): void {
    CookieUtils.Remove(this.jwtConfig.accessTokenKey);
  }

  removeRefreshToken(): void {
    if (this.jwtConfig.refreshTokenKey) {
      CookieUtils.Remove(this.jwtConfig.refreshTokenKey);
    }
  }
}
