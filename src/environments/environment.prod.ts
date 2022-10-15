export const environment = {
  production: true,
  api: {
    host: 'http://localhost:4200',
    prefix: 'api',
    version: 'v1',
  },
  jwt: {
    prefix: 'Bearer',
    accessTokenKey: 'ACCESS_TOKEN_KEY',
    refreshTokenKey: 'REFRESH_TOKEN_KEY',
  },
};
