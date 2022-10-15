import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderPages } from './views/header/header/header.pages';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent, HeaderPages],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule.forRoot({
      apiConfig: {
        host: environment.api.host,
        prefix: environment.api.prefix,
        version: environment.api.version || '',
      },
      jwtConfig: {
        prefix: environment.jwt.prefix,
        accessTokenKey: environment.jwt.accessTokenKey,
        refreshTokenKey: environment.jwt.refreshTokenKey || '',
      },
      logConfig: {
        enable: !environment.production,
      },
      interceptorConfig: {
        authInterceptor: {
          enable: true,
          excludeUrls: [],
        },
        refreshTokenInterceptor: {
          enable: true,
          retry: 0,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
