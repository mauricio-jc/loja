import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../interfaces/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api: string = environment.api;

  constructor(private httpClient: HttpClient) { }

  listAll(): Observable<Categorie[]> {
    return this.httpClient.get<Categorie[]>(`${this.api}/categories`);
  }

  find(id: string): Observable<Categorie> {
    return this.httpClient.get<Categorie>(`${this.api}/categories/${id}`);
  }

  create(categorie: Categorie): Observable<Categorie> {
    return this.httpClient.post<Categorie>(`${this.api}/categories/create`, categorie);
  }

  update(id: string, name: {}): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/categories/edit/${id}`, name);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/categories/delete/${id}`);
  }

  // listAll(): Observable<Categories[]> {
  //   return this._httpClient.get<Office[]>(`${this._endpoint}/office`).pipe(
  //     tap((offices) => {
  //       this._offices.next(offices);
  //     })
  //   );
  // }
}
