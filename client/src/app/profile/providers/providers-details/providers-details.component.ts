import { MatDialog } from '@angular/material';
import { ProvidersService } from './../providers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewFormComponent } from '../../review/add-review-form/add-review-form.component';
import { UserService } from 'src/app/user/user.service';
import { EditformComponent } from 'src/app/editform/editform.component';
import {CreateProviderFormComponent} from "../../create-provider-form/create-provider-form.component";

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss']
})
export class ProvidersDetailsComponent implements OnInit {
  provider;
  providersId;
  url;
  dialogRef;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    public providersService: ProvidersService,
    public userService: UserService
  ) {
    route.paramMap.subscribe((res: any) => {
      this.providersId = res.params.id;
      this.provider = providersService.getProvider(this.providersId);
    });
    this.url = window.location.href;
  }

  addReview() {
    this.dialog.open(AddReviewFormComponent, {
      data: {
        provider_id: this.providersId
      },
      width: '600px',
      autoFocus: false
    });
  }

  openEditProviderDialog() {
    if (false === this.userService.isAuthenticated) {
      return;
    }

    this.providersService.editID = this.providersId;
    console.log(this.providersId);
    this.dialogRef = this.dialog.open(EditformComponent, {
      width: '600px',
      autoFocus: false
    });
  }

  ngOnInit() {}

  convertMilliSecToDate(timestamp: String): String {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString();
  }
}
