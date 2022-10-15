import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginformComponent } from './loginform/loginform.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginformComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginformComponent],
})
export class AuthContainerModule {}
