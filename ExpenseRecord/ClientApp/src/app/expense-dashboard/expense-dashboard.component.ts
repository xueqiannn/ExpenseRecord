import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpenseRecordDto, ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {

  // items?: ExpenseRecordDto[];

  @Input()
  items?:ExpenseRecordDto[];

  @Output()
  newEvent = new EventEmitter<boolean>();

  constructor(private _expenseService: ExpenseService) { }

  ngOnInit(): void {
    this._expenseService.get().subscribe((data) => {
      this.items = [...data];

    })
  }

  add(){
    this.newEvent.emit(false);
  }

  delete(id:string){
    this._expenseService.delete(id).subscribe(()=>{
      this.newEvent.emit(true);
      this._expenseService.get().subscribe((data) => {
        this.items = [...data];
      })
    }
    );



    alert("delete successful! Please refresh page")
  }


}
