import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateProviderFormComponent } from './create-provider-form/create-provider-form.component';
import { ProvidersService } from './providers/providers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myProviders;
  displayedColumns: string[] = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private providers: ProvidersService,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.myProviders = providers.myProviders;
  }

  ngOnInit() {
    this.providers.myProviders.subscribe(res => {
      console.log(res);
      this.dataSource.data = res.data;
    });
  }

  editProvider(id) {
    const provider = this.providers.getProvider(id);
    console.log(provider);
    this.dialog.open(CreateProviderFormComponent, {
      width: '600px',
      autoFocus: false,
      data: {
        provider
      }
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
