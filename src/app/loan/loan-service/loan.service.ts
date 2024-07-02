import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.put<Loan>(url, loan).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = error.error || 'Something went wrong';
    }
    return throwError(() => new Error(errorMessage));
  }

  /*
    private handleError(error: HttpErrorResponse): Observable<never> {
  
      if (error.status === 400) {
        return throwError(() => new Error('El nombre del cliente ya existe, por favor inserte otro.')); //throwError(error) is deprecated, now --> throwError(() => new Error('error')
  
      } else {
        return throwError(() => new Error('Hubo un error :('));
      }
    }
      */

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
