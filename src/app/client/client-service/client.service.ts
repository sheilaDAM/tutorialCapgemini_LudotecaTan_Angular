import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/client'; // URL del backend

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Client[]>(this.apiUrl); // Hacemos la solicitud HTTP GET
  }

  saveClient(client: Client): Observable<Client> {
    //let url = 'http://localhost:8080/client';

    //if (client.id != null) this.apiUrl += '/'+ client.id;
    //return this.http.put<Client>(this.apiUrl, client);

    const url = client.id ? `${this.apiUrl}/${client.id}` : this.apiUrl;
    return this.http.put<Client>(url, client).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {

    if (error.status === 400) {
      return throwError(() => new Error('El nombre del cliente ya existe, por favor inserte otro.')); //throwError(error) is deprecated, now --> throwError(() => new Error('error')

    } else {
      return throwError(() => new Error('Hubo un error :('));
    }

    /*
    //otra manera
    let errorMessage = 'Hubo un error :(';
    if (error.status === 400) {
      errorMessage = 'El nombre del cliente ya existe, por favor inserte otro.';
    }
    return throwError(() => new Error(errorMessage));
    
    */
  }

  deleteClient(idClient: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + idClient);
  }
}
