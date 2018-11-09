import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Apollo } from 'apollo-angular';
import { AddReviewGQL, ProviderGQL } from '../apollo-angular-services';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvidersService } from '../providers/providers.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  allReviewsQuery;
  constructor(
    private addReview: AddReviewGQL,
    private dialog: MatDialog,
    private apollo: Apollo,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private providerGQL: ProviderGQL,
    private providersService: ProvidersService
  ) {}

  createReview(form) {
    const provider_id = form.get('provider_id').value;
    this.apollo
      .mutate({
        mutation: this.addReview.document,
        refetchQueries: [
          {
            query: this.providerGQL.document,
            variables: {
              where: {
                id: provider_id
              }
            }
          }
        ],
        variables: {
          data: {
            rating: form.get('rating').value,
            text: form.get('text').value,
            date: form.get('date').value,
            provider: {
              connect: {
                id: provider_id
              }
            }
          }
        }
      })
      .subscribe(res => {
        this.dialog.closeAll();
      });
  }
}
