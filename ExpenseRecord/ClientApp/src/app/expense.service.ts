import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

export interface ExpenseRecordDto {
  id: string,
  description: string,
  type: string,
  amount: number,
  date: string
}
@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  url = "api/v1/expense"

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<ExpenseRecordDto[]>(this.url).pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    const myurl = `${this.url}/${id}`
    return this.http.delete(myurl).pipe(catchError(this.errorHandler))
  }

  add(expenseRecordDto: ExpenseRecordDto) {
    return this.http.post<ExpenseRecordDto>(this.url, expenseRecordDto).pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('bad request, please retry')
    } else if (error.status === 500) {
      console.error("server error")
    } else if (error.status === 404) {
      console.error("the item doesn't exist")
    }

    return throwError(() => new Error('something is wrong, please try again'))
  };
}
