import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProvidersService } from '../providers/providers.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CreateProviderFormComponent } from './create-provider-form/create-provider-form.component';

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
    this.providers.myProviders.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  editProvider(id) {
    console.log(id);
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
