import { InvestmentsCreateDialogComponent } from './../investments-create-dialog/investments-create-dialog.component';
import { InvestmentsService } from './../investments.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { ProviderGQL, GetInvestmentGQL } from 'src/app/apollo-angular-services';
import { map } from 'rxjs/operators';
import { CreateProviderFormComponent } from 'src/app/profile/create-provider-form/create-provider-form.component';

@Component({
  selector: 'app-investment-card',
  templateUrl: './investment-card.component.html',
  styleUrls: ['./investment-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InvestmentCardComponent implements OnInit {
  @Input()
  investment;
  constructor(
    private apollo: Apollo,
    private getInvestmentGQL: GetInvestmentGQL,
    private dialog: MatDialog,
    private investmentsService: InvestmentsService
  ) {}

  ngOnInit() {}

  edit() {
    this.apollo
      .watchQuery({
        query: this.getInvestmentGQL.document,
        variables: {
          where: {
            id: this.investment.id
          }
        }
      })
      .valueChanges.pipe(
        map(({ data }: { data: any }) => {
          return data.getInvestment;
        })
      )
      .subscribe(investment => {
        this.dialog.open(InvestmentsCreateDialogComponent, {
          width: '600px',
          autoFocus: false,
          data: {
            investment
          }
        });
      });
  }
}
