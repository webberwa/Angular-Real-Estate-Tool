import { MatDialog } from '@angular/material';
import { ProvidersService } from './../providers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddReviewFormComponent } from '../../review/add-review-form/add-review-form.component';

@Component({
  selector: 'app-providers-details',
  templateUrl: './providers-details.component.html',
  styleUrls: ['./providers-details.component.scss']
})
export class ProvidersDetailsComponent implements OnInit {
  provider;
  providersId;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private providersService: ProvidersService
  ) {
    route.paramMap.subscribe((res: any) => {
      this.providersId = res.params.id;
      this.provider = providersService.getProvider(this.providersId);
    });
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
  ngOnInit() {}
}
