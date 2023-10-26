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
  items = [
    {
      "id": "1",
      "description": "lunch",
      "type": "meal",
      "amount": 20.34,
      "date": "2023-10-26T13:54:48.8146843+08:00"
    },
    {
      "id": "2",
      "description": "cup",
      "type": "shop",
      "amount": 40,
      "date": "2023-10-26T13:54:48.8147353+08:00"
    }
  ]
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<ExpenseRecordDto[]>(this.url).pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    const myurl = `${this.url}/${id}`
    return this.http.delete(myurl).pipe(catchError(this.errorHandler))
    // let index = this.items.findIndex((_) => id === _.id);
    // this.items.splice(index, 1);

  }

  add(expenseRecordDto: ExpenseRecordDto) {
    return this.http.post<ExpenseRecordDto>(this.url, expenseRecordDto).pipe(catchError(this.errorHandler))

    // this.items.forEach((item) => {
    //   if (item.id === expenseRecordDto.id) {
    //     this.delete(item.id);
    //   }
    // })
    // this.items.push(expenseRecordDto);
  }

  errorHandler(error:HttpErrorResponse){
    if(error.status===400){
      console.error('bad request, please retry')
    }else if (error.status===500){
      console.error("server error")
    }else if (error.status===404){
      console.error("the item doesn't exist")
    }

    return throwError(()=> new Error('something is wrong, please try again'))
  };
}
