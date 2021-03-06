import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateProviderFormComponent } from './create-provider-form/create-provider-form.component';
import { ProvidersService } from './providers/providers.service';
import { Apollo } from 'apollo-angular';
import { ProviderGQL } from '../apollo-angular-services';
import { map } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  myProviders;
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource();

  deleteid;
  dia: DialogOverviewExampleDialogComponent;

  constructor(
    private providers: ProvidersService,
    private dialog: MatDialog,
    private apollo: Apollo,
    private providerGQL: ProviderGQL,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.myProviders = providers.myProviders;
  }

  openDialog(id): void {
    this.deleteid = id;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      if (this.providers.deletetrue) {
        this.deleteProvider(this.deleteid);
      }
      this.providers.deletetrue = false;
    });
  }

  ngOnInit() {
    this.providers.myProviders.subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data;
    });
  }

  editProvider(id) {
    this.apollo
      .query({
        query: this.providerGQL.document,
        variables: {
          where: {
            id
          }
        }
      })
      // .valueChanges.pipe(
      //   map(({ data }: { data: any }) => {
      //     return data.provider;
      //   })
      // )
      .subscribe((res: any) => {
        const provider = res.data.provider;
        this.dialog.open(CreateProviderFormComponent, {
          width: '600px',
          autoFocus: false,
          data: {
            provider
          }
        });
      });
  }

  deleteProvider(id) {
    this.providers.deleteProvider(id);
  }

  openAddProviderDialog() {
    this.dialog.open(CreateProviderFormComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'exampledialog.html'
})
export class DialogOverviewExampleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    private providerservice: ProvidersService
  ) /*@Inject(MAT_DIALOG_DATA) public data: DialogData*/ {}
  public deletetrue: boolean;
  onNoClick(): void {
    this.providerservice.deletetrue = true;
    this.dialogRef.close();
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
