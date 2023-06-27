import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  success: boolean = false;
  error: boolean = false;
  errorsMessages: Array<string> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  hideAlertSuccess() {
    this.success = false;
  }

  hideAlertError() {
    this.error = false;
  }

  signUp() {
    this.errorsMessages = [];

    const data = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

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
