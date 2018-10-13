import { AuthenticationService } from './../../authentication/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'apollo-client/util/Observable';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { InvestmentsCreateDialogComponent } from './investments-create-dialog/investments-create-dialog.component';
import { InvestmentsService } from './investments.service';
@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {
  constructor(
    private auth: AuthenticationService,
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
}
