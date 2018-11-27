import {
  ChangeDetectorRef,
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { ProvidersService } from './providers.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { EMPTY } from 'rxjs';
import { ProvidersGQL } from 'src/app/apollo-angular-services';
import { CreateProviderFormComponent } from '../create-provider-form/create-provider-form.component';
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvidersComponent implements OnInit {
  allProviders;
  searchForm = new FormGroup({
    text: new FormControl(''),
    type: new FormControl('')
  });
  providerTypes;
  // Number of items
  length = 50;
  // number of items per page
  pageSize = 10;

  loading = true;

  addNewProvider = false;

  searchTimer;

  // MatPaginator Output
  constructor(
    private ref: ChangeDetectorRef,
    private router: Router,
    private apollo: Apollo,
    private providerGQL: ProvidersGQL,
    private providersService: ProvidersService,
    private dialog: MatDialog,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.allProviders = this.providersService.searchProviders();
    this.allProviders.subscribe((data: any) => {
      this.loading = false;
    });

    this.providerTypes = this.providersService.getProviderTypes();
  }

  handleChange(text) {
    this.providersService.searchInput = text;
    this.search();
  }

  handleTypeChange(type) {
    this.providersService.searchType = type;
    this.search();
  }

  search() {
    this.loading = true;
    this.addNewProvider = false;
    this.allProviders = EMPTY;

    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.allProviders = this.providersService.searchProviders();
      this.allProviders.subscribe((data: any) => {
        this.loading = false;

        if (data == null || data.data == null || data.data.length === 0) {
          this.addNewProvider = true;
        }
      });
    }, 1000);
  }

  onPaginateChange(event) {
    this.providersService.searchSkip = event.pageIndex * this.pageSize;
    console.log(event);
    this.allProviders = this.providersService.searchProviders();
  }

  openAddNewProviderPopup() {
    this.dialog.open(CreateProviderFormComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}
