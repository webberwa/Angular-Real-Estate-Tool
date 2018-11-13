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

@Component({
  selector: 'app-investments-details',
  templateUrl: './investments-details.component.html',
  styleUrls: ['./investments-details.component.scss']
})
export class InvestmentsDetailsComponent implements OnInit {
  investmentId;
  investment;
  constructor(
    private apollo: Apollo,
    private investmentGQL: GetInvestmentGQL,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deleteExpenseGQL: DeleteExpenseGQL
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
    // .valueChanges.subscribe((r: any) => {
    //   this.investment = r.data.getInvestment;
    // });
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
      });
  }
}
