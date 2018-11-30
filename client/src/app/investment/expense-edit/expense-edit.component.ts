import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Apollo } from 'apollo-angular';
import {
  AddExpenseGQL,
  GetInvestmentGQL
} from 'src/app/apollo-angular-services';
import { AlertService } from 'src/app/site/alert/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseGQL, UpdateExpenseGQL } from '../../apollo-angular-services';
import { map } from 'rxjs/operators';
import { investment } from '../../../../../server/src/resolvers/investment';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {
  expenseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d+\.?\d*/)
    ]),
    date: new FormControl('', Validators.required)
  });

  expenseId;
  investmentId;
  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private addExpenseGQL: AddExpenseGQL,
    private investmentGQL: GetInvestmentGQL,
    private alert: AlertService,
    private expenseGQL: ExpenseGQL,
    private updateExpenseGQL: UpdateExpenseGQL,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.expenseId = data.expenseId;
    this.investmentId = data.investmentId;
  }

  updateExpense() {
    console.log('update expense');

    const data = {
      title: this.expenseForm.get('title').value,
      description: this.expenseForm.get('description').value,
      price: parseFloat(this.expenseForm.get('price').value),
      date: this.expenseForm.get('date').value
    };

    console.log(data);

    this.apollo
      .mutate({
        mutation: this.updateExpenseGQL.document,
        variables: {
          data,
          where: {
            id: this.expenseId
          }
        },
        refetchQueries: [
          {
            query: this.investmentGQL.document,
            variables: {
              where: {
                id: this.investmentId
              }
            }
          }
        ]
      })
      .subscribe(() => {
        this.dialog.closeAll();
      });
  }

  ngOnInit() {
    this.expenseGQL
      .watch({
        where: {
          id: this.expenseId
        }
      })
      .valueChanges.pipe(
        map(({ data }) => {
          return data.expense;
        })
      )
      .subscribe(expense => {
        this.expenseForm.patchValue({
          title: expense.title,
          description: expense.description,
          price: expense.price,
          date: expense.date
        });
      });
  }
}
