import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getCategories() {
    return this.http.get(`${this.URL}`);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${this.URL}/${id}`);
  }

  createCategory(category: Category) {
    return this.http.post(`${this.URL}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
