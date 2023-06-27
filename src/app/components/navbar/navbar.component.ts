import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$ = this.usersService.get();

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
