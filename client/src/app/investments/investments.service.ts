import { UserService } from './../user/user.service';
import { InvestmentsGQL } from './../apollo-angular-services';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import {
  AddInvestmentGQL,
  DeleteInvestmentGQL
} from '../apollo-angular-services';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  private investments;

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private investmentsGQL: InvestmentsGQL,
    private addInvestmentGQL: AddInvestmentGQL,
    private deleteInvestmentGQL: DeleteInvestmentGQL,
    private userService: UserService
  ) {
    this.investments = this.investmentsGQL
      .watch()
      .valueChanges.pipe(map(({ data }) => data.investments));
  }

  addInvestment(form) {
    this.apollo
      .mutate({
        mutation: this.addInvestmentGQL.document,
        variables: {
          data: {
            address: form.get('address').value,
            price: Number.parseFloat(form.get('price').value.replace('$', '')),
            monthly_rent: Number.parseFloat(
              form.get('monthly_rent').value.replace('$', '')
            ),
            mortgage_downpayment: Number.parseFloat(
              form.get('mortgage_downpayment').value.replace('$', '')
            ),
            mortgage_amount: Number.parseFloat(
              form.get('mortgage_amount').value.replace('$', '')
            ),
            mortgage_interest_rate: Number.parseFloat(
              form.get('mortgage_interest_rate').value.replace('%', '')
            ),
            mortgage_period: Number.parseFloat(
              form.get('mortgage_period').value
            ),
            owner: {
              connect: {
                id: this.userService.me.id
              }
            }
          }
        },
        refetchQueries: [
          {
            query: this.investmentsGQL.document
          }
        ]
      })
      .subscribe(
        res => {
          // Close dialog
          this.dialog.closeAll();
        },
        err => {
          console.log(err.graphQLErrors);
        }
      );
  }

  delete(id) {
    console.log(id);
    this.apollo
      .mutate({
        mutation: this.deleteInvestmentGQL.document,
        variables: {
          where: {
            id
          }
        },
        refetchQueries: [
          {
            query: this.investmentsGQL.document
          }
        ]
      })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
}
