import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api: string = environment.api;
  private headers: Object = {};

  constructor(
    private httpClient: HttpClient,
    private usersService: UsersService
  ) {
    this.headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.usersService.getAccessToken()}`
      })
    }
  }

  listAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.api}/products`, this.headers);
  }

  // find(id: string): Observable<Categorie> {
  //   return this.httpClient.get<Categorie>(`${this.api}/categories/${id}`, this.headers);
  // }

  create(product: any): Observable<Product> {
    return this.httpClient.post<Product>(`${this.api}/products/create`, product, this.headers);
  }

  // update(id: string, name: {}): Observable<any> {
  //   return this.httpClient.put<any>(`${this.api}/categories/edit/${id}`, name, this.headers);
  // }

  // delete(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.api}/categories/delete/${id}`, this.headers);
  // }
}
