import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { Author } from '../model/Author';
import { AuthorPage } from '../model/AuthorPage';
import { AUTHOR_DATA } from '../model/mock-authors';
import { core } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    private apiUrl = 'http://localhost:8080/author'; // URL del backend

    constructor(private http: HttpClient) {
    }


    getAuthors(pageable: Pageable): Observable<AuthorPage> {
        //return of(AUTHOR_DATA);
        return this.http.post<AuthorPage>(this.apiUrl, {pageable:pageable});
    }

    saveAuthor(author: Author): Observable<void> {
        //return of(null);
        if (author.id != null) this.apiUrl += '/' + author.id

        return this.http.put<void>(this.apiUrl, author);
    }

    deleteAuthor(idAuthor: number): Observable<void> {
        //return of(null);
        return this.http.delete<void>(this.apiUrl + '/' + idAuthor);
    }
}