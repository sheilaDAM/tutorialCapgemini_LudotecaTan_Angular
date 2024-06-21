import { HttpClient } from '@angular/common/http'; //para conectarnos al backend y consumir nuestra api  y acceso a bbdd con la info
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/Category';
import { CATEGORY_DATA } from '../model/mock-categories'; //estos eran los datos estáticos que cargaban las diferentes categorías, ahora nos conectaremos al back para obtener las categorías

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/category'; // URL del backend

  constructor(private http: HttpClient) {
   }

  getCategories(): Observable<Category[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Category[]>(this.apiUrl); // Hacemos la solicitud HTTP GET
  }

  saveCategory(category: Category): Observable<Category> {
    //let url = 'http://localhost:8080/category';
      
    if (category.id != null) this.apiUrl += '/'+category.id;
    return this.http.put<Category>(this.apiUrl, category);
  }

  deleteCategory(idCategory : number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + idCategory);
  }  
  
}
