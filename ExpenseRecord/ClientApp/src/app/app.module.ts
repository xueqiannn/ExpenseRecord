import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {GreetingComponent} from "./greeting/greeting.component";
import { ExpenseDashboardComponent } from './expense-dashboard/expense-dashboard.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        GreetingComponent,
        ExpenseDashboardComponent,
        ExpenseEditComponent
    ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
