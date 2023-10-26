import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpenseRecordDto, ExpenseService } from '../expense.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.css']
})
export class ExpenseEditComponent implements OnInit {

  model: ExpenseRecordDto ={
    "id": "",
    "description": "",
    "type": "",
    "amount": 0,
    "date": ""
  }

  constructor(private _expenseService: ExpenseService) { }

  @Output()
  newEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  back(){
    this.newEvent.emit(true);
  }

  save(){
    this.model.id = UUID.UUID();
    this._expenseService.add(this.model as ExpenseRecordDto).subscribe(()=>{
      this.newEvent.emit(true);
    });

  }

}
