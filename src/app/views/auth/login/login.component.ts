import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = "";
  error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  hideAlert() {
    this.error = false;
  }

  login() {
    if(this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.value;

    this.authService.login(data)
    .subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        this.usersService.set(response.access_token);
        this.router.navigate(['/home']);
      },
      error: (responseError) => {
        this.error = true;
        this.errorMessage = 'Usuário ou senha incorretos';
      }
    });
  }
}
