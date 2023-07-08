import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  success: boolean = false;
  error: boolean = false;
  errorsMessages: Array<string> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get name() {
    return this.signUpForm.get('name')!;
  }

  get username() {
    return this.signUpForm.get('username')!;
  }

  get email() {
    return this.signUpForm.get('email')!;
  }

  get password() {
    return this.signUpForm.get('password')!;
  }

  hideAlertSuccess() {
    this.success = false;
  }

  hideAlertError() {
    this.error = false;
  }

  signUp() {
    if(this.signUpForm.invalid) {
      return;
    }

    this.errorsMessages = [];

    const data = this.signUpForm.value;

    this.authService.signUp(data)
    .subscribe({
      next: () => {
        this.success = true;
      },
      error: (responseError) => {
        this.error = true;

        if(Array.isArray(responseError.error.message)) {
          this.errorsMessages = responseError.error.message;
        }
        else {
          this.errorsMessages.push(responseError.error.message);
        }
      }
    });
  }
}
