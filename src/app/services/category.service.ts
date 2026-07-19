import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

private apiUrl = 'https://memesound.runasp.net/api/Category';

  constructor(private http: HttpClient) { }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: number) {
  return this.http.get<Category>(`${this.apiUrl}/${id}`);
}

createCategory(category: Category) {
  return this.http.post(this.apiUrl, category);
}

updateCategory(id: number, category: Category) {
  return this.http.put(`${this.apiUrl}/${id}`, category);
}

deleteCategory(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}