import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Apollo, gql } from 'apollo-angular-boost';
import { InvestmentsCreateDialogComponent } from './investments-create-dialog/investments-create-dialog.component';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  constructor(private dialog: MatDialog, private apollo: Apollo) {}

  investments: any[];
  loading: boolean;
  error: any;

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            investments {
              address
              price
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.investments = result.data && result.data.investments;
        this.loading = result.loading;
        this.error = result.error;
        console.log('done');
        console.log(this.investments);
      });
  }

  openDialog() {
    this.dialog.open(InvestmentsCreateDialogComponent, {
      width: '600px'
    });
  }
}
