import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { InvestmentsCreateDialogComponent } from './investments-create-dialog/investments-create-dialog.component';
import $ from 'jquery';

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
    console.clear();

    const endpoint = 'https://httpbin.org/xml';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'text/xml'
      }
    };
    fetch(endpoint, options)
      .then(res => res.text())
      .then(text => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const value = xmlDoc
          .getElementsByTagName('slide')[0]
          .getElementsByTagName('title')[0].childNodes[0].nodeValue;

        console.log(value);
      });

    this.apollo
      .watchQuery({
        query: gql`
          {
            investments {
              address
              price
              lease
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
        this.investments = result.data && result.data.investments;
        this.loading = result.loading;
        this.error = result.error;
        // console.log('done');
        // console.log(this.investments);
      });
  }

  openDialog() {
    this.dialog.open(InvestmentsCreateDialogComponent, {
      width: '600px'
    });
  }
}
