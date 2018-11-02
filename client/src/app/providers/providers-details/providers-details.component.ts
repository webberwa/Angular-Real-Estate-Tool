import { MatDialog } from '@angular/material';
import { ProvidersService } from './../providers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewFormComponent } from '../../review/add-review-form/add-review-form.component';
import { EditformComponent } from '../../editform/editform.component';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss']
})
export class ProvidersDetailsComponent implements OnInit {
  provider;
  providersId;
  url;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private providersService: ProvidersService
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
    this.providersService.editID=this.providersId;
    console.log(this.providersId);
    this.dialog.open(EditformComponent, {
      width: '600px',
      autoFocus: false
    });
  }
  ngOnInit() {}
}
