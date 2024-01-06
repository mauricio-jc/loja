import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { Contact } from '../interfaces/contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api: string = environment.api;
  private headers: Object = {};

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService
  ) {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.usersService.getAccessToken()}`
      })
    }
  }

  send(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${this.api}/mail/send`, contact, this.headers);
  }
}
