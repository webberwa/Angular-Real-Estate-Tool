import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ProvidersGQL } from '../apollo-angular-services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  provider;
  rate = 5;

  constructor(
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private apollo: Apollo,
    private providerGQL: ProvidersGQL
  ) {
    route.paramMap.subscribe((res: any) => {
      this.getProviderInformation(res.params.id);
    });
  }

  ngOnInit() {}

  getProviderInformation(id: string) {
    const variable = {
      where: {
        id: id
      }
    };

    this.apollo
      .watchQuery({
        query: this.providerGQL.document,
        variables: variable
      })
      .valueChanges.subscribe((res: any) => {
        console.log(res);

        this.provider = res.data.providers[0];
        this.ref.detectChanges();
      });
  }
}
