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

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.URL}`);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }

  createCategory(name: string): Observable<Category> {
    return this.http.post<Category>(`${this.URL}`, {name});
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
