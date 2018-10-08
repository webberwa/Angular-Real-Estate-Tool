import {
  InvestmentsGQL,
  AddInvestmentGQL,
  DeleteInvestmentGQL
} from './../apollo-angular-services';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {
  private investments;

  constructor(
    private apollo: Apollo,
    private investmentsGQL: InvestmentsGQL,
    private addInvestmentGQL: AddInvestmentGQL,
    private deleteInvestmentGQL: DeleteInvestmentGQL
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
            price: Number.parseFloat(form.get('price').value)
          }
        },
        refetchQueries: [
          {
            query: this.investmentsGQL.document
          }
        ]
      })
      .subscribe(
        res => {},
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
