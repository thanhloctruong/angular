import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPages } from './login/login.pages';
import { AuthContainerModule } from 'src/app/containers/auth-container/auth-container.module';

@NgModule({
  declarations: [LoginPages],
  imports: [CommonModule, AuthRoutingModule, AuthContainerModule],
})
export class AuthModule {}
