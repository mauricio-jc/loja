import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  isLoggedIn(): boolean {
    let isToken = localStorage.getItem('access_token');

    if(isToken) {
      return true;
    }

    return false;
  }
}
