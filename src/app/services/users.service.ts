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
  private roles = new BehaviorSubject<any>(null);

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
      this.setRoles();
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

  setRoles(): void {
    this.userRoles().subscribe(response => {
      this.roles.next(response.roles);
    });
  }

  getRoles(): Observable<any> {
    return this.roles.asObservable();
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

  userRoles(): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/users/roles`, this.headers);
  }
}
