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
import {ZipDialogComponent} from "./zip-dialog/zip-dialog.component";

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProvidersComponent implements AfterViewInit {
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

  loading = false;
  noProvider = false;

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
  ) {
    this.providerTypes = this.providersService.getProviderTypes();
  }

  ngAfterViewInit() {
    if (false == this.providersService.initial) {
      this.search();
      return;
    }

    if (this.userService.isAuthenticated) {
      this.setSearchingTimer(false);
      return;
    }

    this.dialog.open(ZipDialogComponent, {
      width: '600px',
      autoFocus: true
    }).afterClosed().subscribe((result) => {
      this.updateSearchText(result);
      this.setSearchingTimer(false);
    });
  }

  private updateSearchText(text: string) {
    if (text == null || text == undefined) {
      text = "";
    }

    this.searchForm.patchValue({text: text});
    this.providersService.searchInput = text;
    this.searchForm.markAsDirty();
    this.ref.detectChanges();
  }

  handleChange(text) {
    this.providersService.searchInput = text;
    this.setSearchingTimer();
  }

  handleTypeChange(type) {
    this.providersService.searchType = type;
    this.setSearchingTimer();
  }

  setSearchingTimer(pending: boolean = true) {
    this.loading = true;
    this.noProvider = false;
    this.allProviders = EMPTY;

    clearTimeout(this.searchTimer);

    if (pending) {
      this.searchTimer = setTimeout(() => this.search(), 1000);
    }else{
      this.search();
    }

    this.ref.detectChanges();
  }

  private search() {
    this.allProviders = this.providersService.searchProviders();
    this.allProviders.subscribe((result: any) => {
      this.loading = false;
      this.providersService.has_next = result.hasNext;
      this.noProvider = (result.providers.length === 0);
    });
  }

  onPaginateChange(page_index) {
    this.providersService.searchSkip = (page_index-1) * this.pageSize;
    this.setSearchingTimer(false);
  }

  openAddNewProviderPopup() {
    this.dialog.open(CreateProviderFormComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}
