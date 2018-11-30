import { ExpensesCreateComponent } from './../../investment/expenses-create/expenses-create.component';
import { GetInvestment } from './../../apollo-angular-services';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  GetInvestmentGQL,
  DeleteExpenseGQL
} from '../../apollo-angular-services';
import { MatDialog } from '@angular/material';
import Chart from 'chart.js';
import { Alert } from 'src/app/site/alert/alert.service';
import { AlertService } from '../../site/alert/alert.service';
import { ConfirmComponent } from '../../site/confirm/confirm.component';
import { ExpenseEditComponent } from 'src/app/investment/expense-edit/expense-edit.component';

@Component({
  selector: 'app-investments-details',
  templateUrl: './investments-details.component.html',
  styleUrls: ['./investments-details.component.scss']
})
export class InvestmentsDetailsComponent implements OnInit {
  investmentId;
  investment;
  investmentChart;
  constructor(
    private apollo: Apollo,
    private investmentGQL: GetInvestmentGQL,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deleteExpenseGQL: DeleteExpenseGQL,
    private alert: AlertService
  ) {
    this.route.paramMap.subscribe((res: any) => {
      this.investmentId = res.params.id;
    });
  }

  ngOnInit() {
    this.investment = this.apollo
      .watchQuery({
        query: this.investmentGQL.document,
        variables: {
          where: {
            id: this.investmentId
          }
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          console.log(data.getInvestment);
          this.investmentId = data.getInvestment.id;
          return data.getInvestment;
        })
      );

    // Add chart
    const ctx = document.getElementById('investmentChart');
    const data = [
      {
        x: new Date(2018, 4, 1),
        y: 100000
      },
      {
        t: new Date(2018, 5, 1),
        y: 110000
      },
      {
        t: new Date(2018, 6, 1),
        y: 120000
      },
      {
        t: new Date(2018, 7, 1),
        y: 125000
      },
      {
        t: new Date(2018, 8, 1),
        y: 130000
      },
      {
        t: new Date(2018, 9, 1),
        y: 125000
      }
    ];

    const config = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Property Value',
            backgroundColor: 'grey',
            borderColor: 'black',
            fill: false,
            data: data
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date'
              },
              ticks: {
                major: {
                  fontStyle: 'bold',
                  fontColor: '#FF0000'
                }
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Price ($)'
              }
            }
          ]
        }
      }
    };

    this.investmentChart = new Chart(ctx, config);
  }

  editExpense(id) {
    this.dialog.open(ExpenseEditComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        expenseId: id,
        investmentId: this.investment.id
      }
    });
  }

  openExpenseDialog() {
    this.dialog.open(ExpensesCreateComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        investmentId: this.investmentId
      }
    });
  }

  openDeleteDialog(id) {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '600px',
      autoFocus: false
    });

    dialog.afterClosed().subscribe(res => {
      console.log(res);
      const confirm = dialog.componentInstance.confirm;
      console.log(confirm);

      if (confirm) {
        this.deleteExpense(id);
      }
    });
  }

  deleteExpense(id) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: this.deleteExpenseGQL.document,
        variables: {
          where: {
            id
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
      .subscribe(res => {
        console.log(res);
        this.alert.open({
          message: 'Expense deleted successfully!',
          type: Alert.SUCCESS
        });
      });
  }
}
