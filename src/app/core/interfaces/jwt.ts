import { JWT_STORE } from "../enums/jwt";

export interface JwtConfig {
  prefix: string;
  accessTokenKey: string;
  refreshTokenKey?: string;
}

export interface JwtAccessToken {
  accessToken: string;
  refreshToken?: string;
  expire?: number | string | null;
}
