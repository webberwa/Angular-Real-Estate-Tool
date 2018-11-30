import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { Observable } from 'apollo-client/util/Observable';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InvestmentsCreateDialogComponent } from './investments-create-dialog/investments-create-dialog.component';
import { InvestmentsService } from './investments.service';
import { investment } from '../../../../server/src/resolvers/investment';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {
  constructor(
    private auth: UserService,
    private router: Router,
    private dialog: MatDialog,
    private investmentsService: InvestmentsService
  ) {}

  openDialog() {
    this.dialog.open(InvestmentsCreateDialogComponent, {
      width: '600px',
      autoFocus: false
    });
  }

  exportCSV() {
    this.investmentsService.getInvestments().subscribe(investments => {
      console.log(investments);

      const header = 'data:text/csv;charset=utf-8,';
      const title =
        'PURCHASE DATE, ADDRESS,MONTHLY RENT,MORTGAGE AMOUNT,MORTGAGE DOWNPAYMENT,MORTGAGE INTEREST RATE,MORTGAGE PERIOD,PRICE,EXPENSES';
      const body = investments
        .map(investment => {
          console.log(this.generateCSV(investment));
          return this.generateCSV(investment);
        })
        .join('\n');

      const file = encodeURI(header + title + '\n' + body);
      this.downloadCSV(file);
    });
  }

  private generateCSV(investment) {
    let expenses = investment.expenses;

    console.log(expenses);

    expenses = expenses.reduce((acc, expense) => {
      console.log(acc);
      console.log(expense);
      acc += 'Title: ' + expense.title + '\r\n';
      acc += 'Description: ' + expense.description + '\r\n';
      acc += 'Price: ' + expense.price + '\r\n';
      acc += 'Date: ' + expense.date + '\r\n';
      acc += '\r\n';
      return acc;
    }, '');

    console.log(expenses);

    return (
      '"' +
      investment.purchase_date +
      '" ,' +
      '"' +
      investment.address +
      '" ,' +
      '"' +
      investment.monthly_rent +
      '" ,' +
      '"' +
      investment.mortgage_amount +
      '" ,' +
      '"' +
      investment.mortgage_downpayment +
      '" ,' +
      '"' +
      investment.mortgage_interest_rate +
      '" ,' +
      '"' +
      investment.mortgage_period +
      '" ,' +
      '"' +
      investment.price +
      '" ,' +
      '"' +
      expenses +
      '"'
    );
  }

  private getNowDate() {
    const now = new Date();
    return now.getFullYear() + '_' + now.getMonth() + '_' + now.getDate();
  }

  private downloadCSV(file) {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = file;
    hiddenElement.target = '_blank';
    hiddenElement.download =
      'oosre_' + this.getNowDate() + '_my_investments.csv';
    hiddenElement.click();
  }
}
