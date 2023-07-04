import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../interfaces/categorie';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

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

  listAll(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${this.api}/categories`, this.headers);
  }

  find(id: string): Observable<Categorie> {
    return this.httpClient.get<Categorie>(`${this.api}/categories/${id}`, this.headers);
  }

  create(categorie: Categorie): Observable<Categorie> {
    return this.httpClient.post<Categorie>(`${this.api}/categories/create`, categorie, this.headers);
  }

  update(id: string, name: {}): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/categories/edit/${id}`, name, this.headers);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/categories/delete/${id}`, this.headers);
  }
}
