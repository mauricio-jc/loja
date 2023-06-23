import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api: string = environment.api;

  constructor(private httpClient: HttpClient) { }

  listAll(): Observable<Categories[]> {
    return this.httpClient.get<Categories[]>(`${this.api}/categories`);
  }

  // listAll(): Observable<Categories[]> {
  //   return this._httpClient.get<Office[]>(`${this._endpoint}/office`).pipe(
  //     tap((offices) => {
  //       this._offices.next(offices);
  //     })
  //   );
  // }
}
