export interface InterceptorConfig {
  authInterceptor: Partial<AuthInterceptorConfig>,
  refreshTokenInterceptor: Partial<RefreshTokenInterceptorConfig>
}

export interface AuthInterceptorConfig {
  enable: boolean,
  excludeUrls: Array<string>
}

export interface RefreshTokenInterceptorConfig {
  enable: boolean,
  retry: number,
}

export interface ApiInterceptorConfig {
  enable: boolean
}
