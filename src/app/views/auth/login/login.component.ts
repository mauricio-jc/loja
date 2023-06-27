import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  hideAlert() {
    this.error = false;
  }

  login() {
    const data = {
      username: this.username,
      password: this.password
    }

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
