import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {

}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface IChangePasswordRequest {
  oldPassword?: string;
  password: string;
  confirmPassword?: string;
}

export interface IForgotPasswordRequest {
  email: string;
}
