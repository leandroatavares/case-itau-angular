import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private URL = `${environment.SERVICE_BASEPATH}/categoria`;

  constructor(
    private http: HttpClient
  ) { }

  /**
    * @description
    * Obtem lista de categorias
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}`);
  }

  /**
    * @description
    * Obtem uma categoria
    *
    * @param id UUID da categoria
  */
  getCategory(id: string) {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }

  /**
    * @description
    * Cria uma nova categoria
    *
    * @param name Nome da categoria
  */
  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.URL}`, {name});
  }

  /**
    * @description
    * Deleta uma categoria
    *
    * @param id UUID da categoria
  */
  deleteCategory(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
