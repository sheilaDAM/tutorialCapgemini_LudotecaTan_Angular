import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { LoanPage } from '../model/LoanPage';
import { Loan } from '../model/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl = 'http://localhost:8080/loan';

  constructor(private http: HttpClient) { }


  getLoans(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>(this.apiUrl, { pageable: pageable });
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    const url = loan.id ? `${this.apiUrl}/${loan.id}` : this.apiUrl;
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
