import { UserService } from './../user/user.service';
import { InvestmentsGQL } from './../apollo-angular-services';
import { Apollo } from 'apollo-angular';
import { Injectable,Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { UpdateInvestmentGQL } from '../apollo-angular-services';
import {
  AddInvestmentGQL,
  DeleteInvestmentGQL
} from '../apollo-angular-services';

import {MatTableDataSource } from '@angular/material';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
}



@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

//newly added
deleteid;
dia:confirmDialog;
openDialog(id): void {
  this.deleteid=id;
  const dialogRef = this.dialog.open(confirmDialog, {
    width: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    //this.animal = result;
    if(this.deletetrue)
      this.delete(this.deleteid);
      this.deletetrue=false;
  });
}











  private investments;
  public deletetrue;
  constructor(
    private dialog: MatDialog,
    private apollo: Apollo,
    private investmentsGQL: InvestmentsGQL,
    private addInvestmentGQL: AddInvestmentGQL,
    private deleteInvestmentGQL: DeleteInvestmentGQL,
    private userService: UserService,
    private updateInvestmentGQL: UpdateInvestmentGQL
  ) {
    this.investments = this.getInvestments();
  }

  public getInvestments() {
    return this.investmentsGQL
      .watch()
      .valueChanges.pipe(map(({ data }) => data.investments));
  }

  formatFloat(string) {
    // let newPrice = price.replace('$', '');
    // newPrice = newPrice.replace(/,/g, '');
    return Number.parseFloat(string);
  }

  formatPercent(percent) {
    console.log(percent);
    // let newPercent = percent.replace('%', '');
    // newPercent = newPercent.replace(/,/g, '');
    return Number.parseFloat(percent) / 100;
  }

  addInvestment(form) {
    this.apollo
      .mutate({
        mutation: this.addInvestmentGQL.document,
        variables: {
          data: {
            address: form.get('address').value,
            price: this.formatFloat(form.get('price').value),
            monthly_rent: this.formatFloat(form.get('monthly_rent').value),
            mortgage_downpayment: this.formatFloat(
              form.get('mortgage_downpayment').value
            ),
            mortgage_amount: this.formatFloat(
              form.get('mortgage_amount').value
            ),
            mortgage_interest_rate: this.formatPercent(
              form.get('mortgage_interest_rate').value
            ),
            mortgage_period: this.formatFloat(
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

  updateInvestment(form, id) {
    console.log('update', form, id);
    console.log(form.get('mortgage_interest_rate').value);
    this.apollo
      .mutate({
        mutation: this.updateInvestmentGQL.document,
        variables: {
          where: {
            id
          },
          data: {
            address: form.get('address').value,
            price: this.formatFloat(form.get('price').value),
            monthly_rent: this.formatFloat(form.get('monthly_rent').value),
            mortgage_downpayment: this.formatFloat(
              form.get('mortgage_downpayment').value
            ),
            mortgage_amount: this.formatFloat(
              form.get('mortgage_amount').value
            ),
            mortgage_interest_rate: this.formatPercent(
              form.get('mortgage_interest_rate').value
            ),
            mortgage_period: this.formatFloat(
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
    //if(this.deletetrue){
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
    //}
    //this.deletetrue=false;
  }
}





@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'exampledialog.html',
})
export class confirmDialog {

  constructor(
    public dialogRef: MatDialogRef<confirmDialog>,
    private investmentsService: InvestmentsService,
    /*@Inject(MAT_DIALOG_DATA) public data: DialogData*/) {}
    public deletetrue:boolean;
  onNoClick(): void {
    this.investmentsService.deletetrue=true;
    this.dialogRef.close();
  }
  cancel():void {
    this.dialogRef.close();
  }

}
