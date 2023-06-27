import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api: string = environment.api;

  constructor(private httpClient: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.httpClient.post<any>(`${this.api}/auth/login`, credentials);
  }
}
