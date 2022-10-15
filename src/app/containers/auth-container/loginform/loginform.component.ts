import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styles: [],
})
export class LoginformComponent implements OnInit {
  loginForm!: FormGroup;
  get form() {
    return this.loginForm.controls;
  }
  constructor(private _authServices: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }

  onSubmit() {
    const data = this.loginForm.value;
    console.log('--data----', data);
    this._authServices.login(data).subscribe({
      next: (res) => {
        console.log('--res----', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
