import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
import { Notification } from 'src/app/interfaces/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$ = this.usersService.get();
  roles$ = this.usersService.getRoles();
  notifications: Notification[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const socket = io("http://localhost:3000");

    socket.on('notification', (notification: any) => {
      this.notifications.push(notification);
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
