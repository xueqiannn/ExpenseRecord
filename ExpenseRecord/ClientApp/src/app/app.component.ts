import { Component } from '@angular/core';
import { ExpenseRecordDto, ExpenseService } from './expense.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showExpenseList = true;

  constructor(private _expenseService: ExpenseService) { }

  items: ExpenseRecordDto[] = [];


  ngOnInit(): void {
    this._expenseService.get().subscribe((data) => {
      this.items = [...data];
    })
  }

  showEditPage(b: any){
    this.showExpenseList = b as boolean;

  }

  showListPage(b:any){
    this.showExpenseList = b as boolean;
    this._expenseService.get().subscribe((data) => {
      this.items = [...data];
    })
  }



}
