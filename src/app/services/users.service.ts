import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api: string = environment.api;
  private headers: Object = {};
  private userData = new BehaviorSubject<User>({});

  constructor(private httpClient: HttpClient) {
    const accessToken = this.getAccessToken();
    
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      })
    }

    if(accessToken !== null) {
      this.set(accessToken);
    }
  }

  isLoggedIn(): boolean {
    let isToken = this.getAccessToken();

    if(isToken) {
      return true;
    }

    return false;
  }

  set(accessToken: string): void {
    const jsonWebTokenDecoded = jwt_decode(accessToken) as any;
    this.find(jsonWebTokenDecoded.sub).subscribe(response => {
      this.userData.next({
        sub: response.id,
        email: response.email,
        name: response.name
      });
    });
  }

  get(): Observable<User> {
    return this.userData.asObservable();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token') ?? null;
  }

  find(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.api}/users/${id}`, this.headers);
  }
}
