import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
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
      
    if (client.id != null) this.apiUrl += '/'+ client.id;
    return this.http.put<Client>(this.apiUrl, client);
  }

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete(this.apiUrl + "/" + idClient);
  }  
}
